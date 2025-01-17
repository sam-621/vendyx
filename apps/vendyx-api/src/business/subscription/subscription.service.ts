import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';
import Stripe from 'stripe';

import { CreateCheckoutSessionInput } from '@/api/shared/types/gql.types';
import { ConfigService } from '@/config/config.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

// TODO: Manage errors (try catch)
@Injectable()
export class SubscriptionService {
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE.SECRET_KEY'));
    console.log('Stripe secret key:', this.configService.get('STRIPE.SECRET_KEY'));
  }

  async createCheckoutSession(input: CreateCheckoutSessionInput) {
    const { stripeCustomerId } = await this.findOrCreateStripeCustomer(input.userId);
    console.log({
      stripeCustomerId
    });

    const { sessionUrl } = await this.createCheckoutSessionWithStripe({
      lookupKey: input.lookupKey,
      stripeCustomerId
    });

    return {
      sessionUrl
    };
  }

  async webhook(event: any, signature: string) {
    const endpointSecret = this.configService.get('STRIPE.WEBHOOK_SECRET');

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      // const signature = request.headers['stripe-signature'];
      try {
        event = this.stripe.webhooks.constructEvent(event, signature, endpointSecret);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
      }
    }
    const stripeEvent = event as Stripe.Event;

    // Handle the event
    switch (stripeEvent.type) {
      // case 'customer.subscription.trial_will_end':
      //   subscription = event.data.object;
      //   status = subscription.status;
      //   console.log(`Subscription status is ${status}.`);
      //   // Then define and call a method to handle the subscription trial ending.
      //   // handleSubscriptionTrialEnding(subscription);
      //   break;
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted':
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        await this.manageSubscriptionStatusChange({
          stripeCustomerId: subscription.customer as string,
          subscriptionId: subscription.id
        });
      // case 'entitlements.active_entitlement_summary.updated':
      //   subscription = event.data.object;
      //   console.log(`Active entitlement summary updated for ${subscription}.`);
      //   console.log({
      //     data: subscription
      //   });
      //   // Then define and call a method to handle active entitlement summary updated
      //   // handleEntitlementUpdated(subscription);
      //   break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    return { received: true };
  }

  private async createCheckoutSessionWithStripe(input: CreateCheckoutSessionInputWithStripe) {
    try {
      const stripe = new Stripe(this.configService.get('STRIPE.SECRET_KEY'));
      const prices = await stripe.prices.list({
        lookup_keys: [input.lookupKey],
        expand: ['data.product']
      });

      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: prices.data[0].id,
            // For metered billing, do not pass quantity
            quantity: 1
          }
        ],
        customer: input.stripeCustomerId,
        mode: 'subscription',
        success_url: `${this.configService.get(
          'ADMIN.DOMAIN'
        )}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('ADMIN.DOMAIN')}`
      });

      return {
        sessionUrl: session.url
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  private async createPortalSession({ sessionId }: CreatePortalSessionInput) {
    const checkoutSession = await this.stripe.checkout.sessions.retrieve(sessionId);

    const portalSession = await this.stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: `${this.configService.get('ADMIN.DOMAIN')}/account`
    });

    return {
      data: portalSession
    };
  }

  private async findOrCreateStripeCustomer(userId: ID) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });

    let stripeCustomerId: Stripe.Customer['id'] | null = null;

    // If not stripe customer id present, find by email
    // This to provide a good ux for the user in case user has the same email
    // in stripe and vendyx
    if (!user.stripeCustomerId) {
      const stripeCustomers = await this.stripe.customers.list({ email: user?.email });

      stripeCustomerId = stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : null;
    } else {
      stripeCustomerId = (await this.stripe.customers.retrieve(user.stripeCustomerId)).id;
    }

    // If there is no stripe customer id in vendyx or via email in stripe, create customer in stripe
    if (!stripeCustomerId) {
      const newStripeCustomer = await this.stripe.customers.create({
        email: user.email,
        metadata: { vendyxId: user.id }
      });

      stripeCustomerId = newStripeCustomer.id;
    }

    // Once you have stripe customer id, if there is no stripeCustomerId in vendyx, save it
    if (!user.stripeCustomerId) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId }
      });
    }

    return {
      stripeCustomerId
    };
  }

  private async manageSubscriptionStatusChange(input: ManageSubscriptionStatusChangeInput) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { stripeCustomerId: input.stripeCustomerId },
      include: { subscription: true }
    });

    const stripeSubscription = await this.stripe.subscriptions.retrieve(input.subscriptionId);

    await this.prisma.subscription.upsert({
      where: { id: user.subscription?.id },
      create: {
        status: this.parseStripeSubscriptionStatus(stripeSubscription.status),
        plan: SubscriptionPlan.BASIC, // TODO: Get plan from stripe
        currentPeriodStart: new Date(stripeSubscription.current_period_start),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end)
      },
      update: {
        status: this.parseStripeSubscriptionStatus(stripeSubscription.status),
        plan: SubscriptionPlan.BASIC, // TODO: Get plan from stripe
        currentPeriodStart: new Date(stripeSubscription.current_period_start),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end)
      }
    });
  }

  private parseStripeSubscriptionStatus(status: Stripe.Subscription.Status) {
    switch (status) {
      case 'active':
        return SubscriptionStatus.ACTIVE;
      case 'canceled':
        return SubscriptionStatus.CANCELED;
      case 'incomplete':
        return SubscriptionStatus.INCOMPLETE;
      case 'incomplete_expired':
        return SubscriptionStatus.INCOMPLETE_EXPIRED;
      case 'past_due':
        return SubscriptionStatus.PAST_DUE;
      case 'trialing':
        return SubscriptionStatus.TRIALING;
      case 'unpaid':
        return SubscriptionStatus.UNPAID;
      default:
        return SubscriptionStatus.CANCELED;
    }
  }
}

type CreateCheckoutSessionInputWithStripe = {
  lookupKey: string;
  stripeCustomerId: string;
};

export type CreatePortalSessionInput = {
  sessionId: string;
};

type ManageSubscriptionStatusChangeInput = {
  subscriptionId: string;
  stripeCustomerId: string;
};

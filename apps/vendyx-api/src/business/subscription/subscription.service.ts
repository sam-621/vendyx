import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import { CheckoutWithStripeInput } from '@/api/subscription';
import { PrismaForShop } from '@/persistance/prisma-clients';
import { ID } from '@/persistance/types';

@Injectable()
export class SubscriptionService {
  stripe: Stripe;
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaForShop
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY') ?? '');
  }

  async checkoutWithStripe(input: CheckoutWithStripeInput) {
    const { stripeCustomerId } = await this.findOrCreateStripeCustomer(input.userId);

    const { sessionId } = await this.createCheckoutSession({
      lookupKey: input.lookupKey,
      stripeCustomerId
    });

    return {
      sessionId
    };
  }

  async webhook(event: any, signature: string) {
    const endpointSecret = this.configService.get('STRIPE_WEBHOOK_SIGNING_SECRET');

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
    let subscription;
    let status;

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        console.log({
          dataSubCreated: subscription
        });

        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        console.log({
          dataSubUpdated: subscription
        });
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      case 'entitlements.active_entitlement_summary.updated':
        subscription = event.data.object;
        console.log(`Active entitlement summary updated for ${subscription}.`);
        console.log({
          data: subscription
        });
        // Then define and call a method to handle active entitlement summary updated
        // handleEntitlementUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    return { received: true };
  }

  private async createPortalSession({ sessionId }: CreatePortalSessionInput) {
    const checkoutSession = await this.stripe.checkout.sessions.retrieve(sessionId);

    const portalSession = await this.stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: `${this.configService.get('CLIENT_DOMAIN')}/account`
    });

    return {
      data: portalSession
    };
  }

  private async createCheckoutSession(input: CreateCheckoutSessionInput) {
    const prices = await this.stripe.prices.list({
      lookup_keys: [input.lookupKey],
      expand: ['data.product']
    });

    const session = await this.stripe.checkout.sessions.create({
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
        'CLIENT_DOMAIN'
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('CLIENT_DOMAIN')}`
    });

    return {
      sessionId: session.id
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
}

type CreateCheckoutSessionInput = {
  lookupKey: string;
  stripeCustomerId: string;
};

export type CreatePortalSessionInput = {
  sessionId: string;
};

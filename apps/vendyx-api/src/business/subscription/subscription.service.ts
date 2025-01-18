import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';
import Stripe from 'stripe';

import { CreateCheckoutSessionInput } from '@/api/shared/types/gql.types';
import { ConfigService } from '@/config/config.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { RAW_PRISMA, RawPrisma } from '@/persistence/prisma-clients/raw-prisma.provider';
import { ID } from '@/persistence/types/scalars.type';

@Injectable()
export class SubscriptionService {
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    @Inject(RAW_PRISMA) private readonly rawPrisma: RawPrisma
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE.SECRET_KEY'));
  }

  async createCheckoutSession(userId: ID, input: CreateCheckoutSessionInput) {
    const { stripeCustomerId } = await this.findOrCreateStripeCustomer(userId);

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

    try {
      event = this.stripe.webhooks.constructEvent(event, signature, endpointSecret);
    } catch (err) {
      throw new Error(`Webhook signature verification failed`);
    }

    const stripeEvent = event as Stripe.Event;

    switch (stripeEvent.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted':
        const subscription = stripeEvent.data.object as Stripe.Subscription;

        await this.manageSubscriptionStatusChange({
          stripeCustomerId: subscription.customer as string,
          subscriptionId: subscription.id
        });
      default:
    }
  }

  // TODO: Manage errors (stripe throws errors)
  private async createCheckoutSessionWithStripe(input: CreateCheckoutSessionInputWithStripe) {
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
    const user = await this.prisma.user.findUnique({
      where: { stripeCustomerId: input.stripeCustomerId }
    });

    const [, subscription] = await this.rawPrisma.$transaction([
      this.rawPrisma.$executeRaw`SELECT set_config('app.current_owner_id', ${`${user?.id}`}, TRUE)`,
      this.rawPrisma.subscription.findFirst()
    ]);

    const stripeSubscription = await this.stripe.subscriptions.retrieve(input.subscriptionId);

    if (subscription?.id) {
      await this.rawPrisma.$transaction([
        this.rawPrisma
          .$executeRaw`SELECT set_config('app.current_owner_id', ${`${user?.id}`}, TRUE)`,
        this.rawPrisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: this.parseStripeSubscriptionStatus(stripeSubscription.status),
            plan: this.getPlanByProductId(
              stripeSubscription.items.data[0].plan.product?.toString() ?? ''
            ),
            currentPeriodStart: this.toDate(stripeSubscription.current_period_start),
            currentPeriodEnd: this.toDate(stripeSubscription.current_period_end)
          }
        })
      ]);
    } else {
      await this.rawPrisma.$transaction([
        this.rawPrisma
          .$executeRaw`SELECT set_config('app.current_owner_id', ${`${user?.id}`}, TRUE)`,
        this.rawPrisma.subscription.create({
          data: {
            status: this.parseStripeSubscriptionStatus(stripeSubscription.status),
            plan: this.getPlanByProductId(
              stripeSubscription.items.data[0].plan.product?.toString() ?? ''
            ),
            currentPeriodStart: this.toDate(stripeSubscription.current_period_start),
            currentPeriodEnd: this.toDate(stripeSubscription.current_period_end)
          }
        })
      ]);
    }
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

  private toDate(ms: number) {
    const t = new Date(+0); // Unix epoch start.
    t.setSeconds(ms);

    return t;
  }

  private getPlanByProductId(productId: string) {
    const [basic1, basic2] = this.configService.get('STRIPE.BASIC_PRODUCT_ID').split('/');
    const [essential1, essential2] = this.configService
      .get('STRIPE.ESSENTIAL_PRODUCT_ID')
      .split('/');

    const IDS = {
      [basic1]: SubscriptionPlan.BASIC,
      [basic2]: SubscriptionPlan.BASIC,
      [essential1]: SubscriptionPlan.ESSENTIAL,
      [essential2]: SubscriptionPlan.ESSENTIAL
    };

    return IDS[productId];
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

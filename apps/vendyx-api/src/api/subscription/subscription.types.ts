import { SubscriptionPlan } from '@prisma/client';

import { ID } from '@/persistance/types';

export type CheckoutWithStripeInput = {
  lookupKey: string;
  plan: SubscriptionPlan;
  userId: ID;
};

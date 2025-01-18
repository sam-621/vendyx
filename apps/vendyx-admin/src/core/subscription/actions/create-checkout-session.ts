'use server';

import { redirect } from 'next/navigation';

import { SubscriptionService } from '@/api/services/subscription.service';

export const createCheckoutSession = async (lookupKey: string) => {
  const result = await SubscriptionService.createCheckoutSession({ lookupKey });

  redirect(result.sessionUrl);
};

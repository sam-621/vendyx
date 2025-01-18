'use server';

import { SubscriptionService } from '@/api/services/subscription.service';

export const createCheckoutSession = () => {
  const result = SubscriptionService.createCheckoutSession();
};

'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { PaymentMethodService } from '@/api/services/payment-method.service';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const removePaymentMethod = async (paymentMethodId: string) => {
  await PaymentMethodService.remove(paymentMethodId);

  const base = getBasePathFormHeaders(headers());

  revalidateTag(PaymentMethodService.Tags.methods);
  redirect(`${base}/settings/payments`);
};

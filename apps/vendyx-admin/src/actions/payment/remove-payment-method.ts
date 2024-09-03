'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { PaymentMethodService } from '@/api';
import { getBasePathFormHeaders } from '@/lib/utils';

export const removePaymentMethod = async (paymentMethodId: string) => {
  await PaymentMethodService.remove(paymentMethodId);

  const base = getBasePathFormHeaders(headers());

  revalidateTag(PaymentMethodService.Tags.methods);
  redirect(`${base}/settings/payments`);
};

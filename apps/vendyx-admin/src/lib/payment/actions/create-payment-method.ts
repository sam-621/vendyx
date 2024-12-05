'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { PaymentMethodService } from '@/api/services';
import { getBasePathFormHeaders } from '@/lib/shared/utils';

export const createPaymentMethod = async (input: Input) => {
  const result = await PaymentMethodService.create({
    handler: {
      code: input.handlerCode,
      args: input.args
    },
    enabled: input.enabled
  });

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  const basePath = getBasePathFormHeaders(headers());

  revalidateTag(PaymentMethodService.Tags.methods);
  redirect(`${basePath}/settings/payments/${result.paymentMethodId}`);
};

type Input = {
  handlerCode: string;
  args: Record<string, string>;
  enabled: boolean;
};

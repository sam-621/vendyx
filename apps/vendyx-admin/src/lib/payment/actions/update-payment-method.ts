'use server';

import { revalidateTag } from 'next/cache';

import { PaymentMethodService } from '@/api/services';

export const updatePaymentMethod = async (id: string, input: Input) => {
  const result = await PaymentMethodService.update(id, {
    args: input.args,
    enabled: input.enabled
  });

  revalidateTag(PaymentMethodService.Tags.method(result.id));
  revalidateTag(PaymentMethodService.Tags.methods);
};

type Input = {
  args: Record<string, string>;
  enabled: boolean;
};

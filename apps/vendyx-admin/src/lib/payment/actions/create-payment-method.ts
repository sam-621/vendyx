'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { PaymentMethodService } from '@/api/services';
import { getBasePathFormHeaders } from '@/lib/shared/utils';

export const createPaymentMethod = async (input: Input) => {
  const result = await PaymentMethodService.create({
    integrationId: input.integrationId,
    integrationMetadata: input.metadata,
    enabled: input.enabled
  });

  const basePath = getBasePathFormHeaders(headers());

  revalidateTag(PaymentMethodService.Tags.methods);
  redirect(`${basePath}/settings/payments/${result.id}`);
};

type Input = {
  integrationId: string;
  metadata: Record<string, string>;
  enabled: boolean;
};

'use server';

import { revalidateTag } from 'next/cache';

import { ShippingMethodService, ZoneService } from '@/api/services';
import { type CreateShippingMethodInput } from '@/api/types';

export const createShippingMethod = async (input: CreateShippingMethodInput) => {
  const result = await ShippingMethodService.create(input);

  if (!result.success) {
    return { error: result.error };
  }

  revalidateTag(ZoneService.Tags.zone(input.zoneId));
};

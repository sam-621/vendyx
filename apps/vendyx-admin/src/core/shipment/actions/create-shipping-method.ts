'use server';

import { revalidateTag } from 'next/cache';

import { ShippingMethodService } from '@/api/services/shipping-method.service';
import { ZoneService } from '@/api/services/zone.service';
import { type CreateShippingMethodInput } from '@/api/types';

export const createShippingMethod = async (input: CreateShippingMethodInput) => {
  const result = await ShippingMethodService.create(input);

  if (!result.success) {
    return { error: result.error };
  }

  revalidateTag(ZoneService.Tags.zone(input.zoneId));
};

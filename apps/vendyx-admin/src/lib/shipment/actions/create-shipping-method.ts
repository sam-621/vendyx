'use server';

import { revalidateTag } from 'next/cache';

import { ShippingMethodService, ZoneService } from '@/api/services';
import { type CreateShippingMethodInput } from '@/api/types';

export const createShippingMethod = async (input: CreateShippingMethodInput) => {
  await ShippingMethodService.create(input);

  revalidateTag(ZoneService.Tags.zone(input.zoneId));
};

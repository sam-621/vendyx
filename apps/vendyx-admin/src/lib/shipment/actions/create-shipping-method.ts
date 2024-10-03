'use server';

import { revalidateTag } from 'next/cache';

import { type CreateShippingMethodInput, ShippingMethodService, ZoneService } from '@/api';

export const createShippingMethod = async (input: CreateShippingMethodInput) => {
  await ShippingMethodService.create(input);

  revalidateTag(ZoneService.Tags.zone(input.zoneId));
};

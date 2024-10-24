'use server';

import { revalidateTag } from 'next/cache';

import { type ID, ShippingMethodService, ZoneService } from '@/api';

export const removeShippingMethod = async (methodId: ID, zoneId: ID) => {
  await ShippingMethodService.remove(methodId);
  revalidateTag(ZoneService.Tags.zone(zoneId));
};

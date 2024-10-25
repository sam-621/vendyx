'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { ShippingMethodService, ZoneService } from '@/api/services';

export const removeShippingMethod = async (methodId: ID, zoneId: ID) => {
  await ShippingMethodService.remove(methodId);
  revalidateTag(ZoneService.Tags.zone(zoneId));
};

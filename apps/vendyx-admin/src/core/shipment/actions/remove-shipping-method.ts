'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { ShippingMethodService } from '@/api/services/shipping-method.service';
import { ZoneService } from '@/api/services/zone.service';

export const removeShippingMethod = async (methodId: ID, zoneId: ID) => {
  await ShippingMethodService.remove(methodId);
  revalidateTag(ZoneService.Tags.zone(zoneId));
};

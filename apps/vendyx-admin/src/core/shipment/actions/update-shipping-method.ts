'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { ShippingMethodService } from '@/api/services/shipping-method.service';
import { ZoneService } from '@/api/services/zone.service';
import { type UpdateShippingMethodInput } from '@/api/types';

export const updateShippingMethod = async (
  zoneId: ID,
  methodId: ID,
  input: UpdateShippingMethodInput
) => {
  await ShippingMethodService.update(methodId, input);

  revalidateTag(ZoneService.Tags.zone(zoneId));
};

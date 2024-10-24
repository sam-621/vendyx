'use server';

import { revalidateTag } from 'next/cache';

import { type ID, ShippingMethodService, type UpdateShippingMethodInput, ZoneService } from '@/api';

export const updateShippingMethod = async (
  zoneId: ID,
  methodId: ID,
  input: UpdateShippingMethodInput
) => {
  await ShippingMethodService.update(methodId, input);

  revalidateTag(ZoneService.Tags.zone(zoneId));
};

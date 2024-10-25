'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { ShippingMethodService, ZoneService } from '@/api/services';
import { type UpdateShippingMethodInput } from '@/api/types';

export const updateShippingMethod = async (
  zoneId: ID,
  methodId: ID,
  input: UpdateShippingMethodInput
) => {
  await ShippingMethodService.update(methodId, input);

  revalidateTag(ZoneService.Tags.zone(zoneId));
};

'use server';

import { revalidateTag } from 'next/cache';

import { type ID, type UpdateZoneInput, ZoneService } from '@/api';

export const updateZone = async (zoneId: ID, input: UpdateZoneInput) => {
  await ZoneService.update(zoneId, input);

  revalidateTag(ZoneService.Tags.zone(zoneId));
};

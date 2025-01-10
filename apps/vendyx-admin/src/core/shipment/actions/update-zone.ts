'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { ZoneService } from '@/api/services/zone.service';
import { type UpdateZoneInput } from '@/api/types';

export const updateZone = async (zoneId: ID, input: UpdateZoneInput) => {
  await ZoneService.update(zoneId, input);

  revalidateTag(ZoneService.Tags.zone(zoneId));
};

'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { ZoneService } from '@/api/services';
import { type UpdateZoneInput } from '@/api/types';

export const updateZone = async (zoneId: ID, input: UpdateZoneInput) => {
  await ZoneService.update(zoneId, input);

  revalidateTag(ZoneService.Tags.zone(zoneId));
};

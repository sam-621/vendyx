'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { ZoneService } from '@/api/services/zone.service';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const removeZone = async (id: ID) => {
  await ZoneService.remove(id);

  const base = getBasePathFormHeaders(headers());

  revalidateTag(ZoneService.Tags.zones);
  redirect(`${base}/settings/shipments`);
};

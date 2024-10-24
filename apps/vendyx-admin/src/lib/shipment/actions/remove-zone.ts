'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID, ZoneService } from '@/api';
import { getBasePathFormHeaders } from '@/lib/shared/utils';

export const removeZone = async (id: ID) => {
  await ZoneService.remove(id);

  const base = getBasePathFormHeaders(headers());

  revalidateTag(ZoneService.Tags.zones);
  redirect(`${base}/settings/shipments`);
};

'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars';
import { CollectionService } from '@/api/services';
import { getBasePathFormHeaders } from '@/lib/shared/utils';

export const removeCollection = async (id: ID) => {
  await CollectionService.remove(id);

  const base = getBasePathFormHeaders(headers());

  revalidateTag(CollectionService.Tags.collections);
  redirect(`${base}/collections`);
};

'use server';

import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars';
import { CollectionService } from '@/api/services';

export const removeCollection = async (id: ID) => {
  await CollectionService.remove(id);
  redirect('/collections');
};

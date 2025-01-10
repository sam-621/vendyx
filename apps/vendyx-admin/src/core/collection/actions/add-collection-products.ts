'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';

export const addCollectionProducts = async (collectionId: ID, products: ID[]) => {
  const collection = await CollectionService.update(collectionId, {
    products
  });

  revalidateTag(CollectionService.Tags.collectionProducts(collection.id));
};

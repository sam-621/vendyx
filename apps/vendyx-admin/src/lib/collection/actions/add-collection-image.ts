'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { AssetService, CollectionService } from '@/api/services';

export const addCollectionImage = async (collectionId: ID, image: FormData) => {
  const [newAsset] = await AssetService.upload(image);

  const collection = await CollectionService.update(collectionId, {
    assets: [{ id: newAsset.id }]
  });

  revalidateTag(CollectionService.Tags.collection(collection.id));
};

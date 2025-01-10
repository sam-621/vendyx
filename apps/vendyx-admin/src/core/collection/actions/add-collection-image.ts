'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { AssetService } from '@/api/services/asset.service';
import { CollectionService } from '@/api/services/collection.service';

export const addCollectionImage = async (collectionId: ID, image: FormData) => {
  const [newAsset] = await AssetService.upload(image);

  const collection = await CollectionService.update(collectionId, {
    assets: [{ id: newAsset.id }]
  });

  revalidateTag(CollectionService.Tags.collection(collection.id));
};

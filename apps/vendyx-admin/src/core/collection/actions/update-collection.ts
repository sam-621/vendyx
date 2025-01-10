'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';
import { type UpdateCollectionInput } from '@/api/types';

export const updateCollection = async (id: ID, input: Input) => {
  const collection = await CollectionService.update(id, {
    name: input.name,
    description: input.description,
    enabled: input.enabled,
    products: input.products
  });

  revalidateTag(CollectionService.Tags.collection(collection.id));
};

type Input = Pick<UpdateCollectionInput, 'name' | 'description' | 'enabled'> & {
  products?: ID[];
};

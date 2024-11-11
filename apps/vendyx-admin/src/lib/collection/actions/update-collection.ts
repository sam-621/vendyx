'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { CollectionService } from '@/api/services';
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

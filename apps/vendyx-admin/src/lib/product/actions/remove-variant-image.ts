'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { ProductService, VariantService } from '@/api/services';

export const removeVariantImage = async (variantsIds: ID[], productId: ID) => {
  await Promise.all(
    variantsIds.map(
      async variant =>
        await VariantService.update(variant, {
          assetId: null
        })
    )
  );

  revalidateTag(ProductService.Tags.product(productId));
};

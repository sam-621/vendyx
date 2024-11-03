'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { AssetService, ProductService, VariantService } from '@/api/services';

export const addVariantImage = async (variantsIds: ID[], image: FormData, productId: ID) => {
  const [newAsset] = await AssetService.upload(image);

  await Promise.all(
    variantsIds.map(
      async variant =>
        await VariantService.update(variant, {
          assetId: newAsset.id
        })
    )
  );

  revalidateTag(ProductService.Tags.product(productId));
};

'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { AssetService } from '@/api/services/asset.service';
import { ProductService } from '@/api/services/product.service';
import { VariantService } from '@/api/services/variant.service';

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

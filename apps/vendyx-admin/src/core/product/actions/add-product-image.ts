'use server';

import { revalidateTag } from 'next/cache';

import { AssetService } from '@/api/services/asset.service';
import { ProductService } from '@/api/services/product.service';

export const addProductImage = async (
  productId: string,
  prevImages: { id: string; order: number }[],
  newImage: FormData
) => {
  const [newAsset] = await AssetService.upload(newImage);

  await ProductService.update(productId, {
    assets: [
      ...prevImages.map(asset => ({ id: asset.id, order: asset.order })),
      { id: newAsset.id, order: prevImages.length }
    ]
  });

  revalidateTag(ProductService.Tags.product(productId));
};

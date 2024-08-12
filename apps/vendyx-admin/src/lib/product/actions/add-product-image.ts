'use server';

import { revalidateTag } from 'next/cache';

import { assetService, productService, ProductTags } from '@/lib/shared/api';

export const addProductImage = async (
  productId: string,
  prevImages: { id: string; order: number }[],
  newImage: FormData
) => {
  const [newAsset] = await assetService.upload(newImage);

  await productService.update(productId, {
    assets: [
      ...prevImages.map(asset => ({ id: asset.id, order: asset.order })),
      { id: newAsset.id, order: prevImages.length }
    ]
  });

  revalidateTag(ProductTags.product(productId));
};

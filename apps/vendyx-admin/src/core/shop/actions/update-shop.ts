'use server';

import { revalidateTag } from 'next/cache';

import { ShopService } from '@/api/services/shop.service';
import { type UpdateShopInput } from '@/api/types';

export const updateShop = async (shopSlug: string, input: Input) => {
  const result = await ShopService.update(shopSlug, input);

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  const { slug } = result.shop;

  revalidateTag(ShopService.Tags.shops);
  revalidateTag(ShopService.Tags.shop(slug));
};

type Input = UpdateShopInput;

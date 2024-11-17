'use server';

import { revalidateTag } from 'next/cache';

import { ShopService } from '@/api/services';
import { type UpdateShopInput } from '@/api/types';

export const updateShop = async (shopSlug: string, input: Input) => {
  const { slug } = await ShopService.update(shopSlug, input);

  revalidateTag(ShopService.Tags.shops);
  revalidateTag(ShopService.Tags.shop(slug));
};

type Input = UpdateShopInput;

'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { ShopService } from '@/api/services/shop.service';
import { type CreateShopInput } from '@/api/types';
import { setActiveShop } from '@/shared/cookies/cookies';

export const createShop = async (input: CreateShopInput) => {
  const result = await ShopService.create(input);

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  const { id, slug } = result.shop;

  setActiveShop({ id, slug });

  revalidateTag(ShopService.Tags.shops);
  redirect(`/shops/${slug}`);
};

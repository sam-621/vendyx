'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { ShopService } from '@/api/services';
import { type CreateShopInput } from '@/api/types';
import { setActiveShop } from '@/lib/shared/cookies';

export const createShop = async (input: CreateShopInput) => {
  const { id: shopId, slug: shopSlug } = await ShopService.create(input);

  setActiveShop({ id: shopId, slug: shopSlug });

  revalidateTag(ShopService.Tags.shops);
  redirect(`/shops/${shopSlug}`);
};

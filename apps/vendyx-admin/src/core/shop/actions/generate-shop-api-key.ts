'use server';

import { revalidateTag } from 'next/cache';

import { ShopService } from '@/api/services/shop.service';

export const generateShopApiKey = async () => {
  const result = await ShopService.generateShopApiKey();
  console.log({
    result
  });

  revalidateTag(ShopService.Tags.shops);
  revalidateTag(ShopService.Tags.shop(result?.slug ?? ''));
};

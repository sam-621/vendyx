'use server';

import { redirect } from 'next/navigation';

import { shopService, userService } from '@/lib/shared/api';
import { setShopId, setToken } from '@/lib/shared/cookies';

export const login = async (email: string, password: string) => {
  const result = await userService.generateAccessToken({ email, password });

  if (!result.success) {
    return { error: result.error };
  }

  setToken(result.accessToken);

  const shops = await shopService.getAll();
  const shop = shops.items[0]; // By now we only support one shop per user, TODO: Remove in the future

  setShopId(shop.id);

  redirect(`/shops/${shop.slug}`);
};

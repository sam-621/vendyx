'use server';

import { redirect } from 'next/navigation';

import { ShopService, UserService } from '@/api/services';
import { setShopId, setToken } from '@/lib/shared/cookies';

export const login = async (email: string, password: string) => {
  const result = await UserService.generateAccessToken({ email, password });

  if (!result.success) {
    return { error: result.error };
  }

  setToken(result.accessToken);

  const shops = await ShopService.getAll();
  const shop = shops.items[0]; // By now we only support one shop per user, TODO: Remove in the future
  setShopId(shop.id);

  redirect(`/shops/${shop.slug}`);
};

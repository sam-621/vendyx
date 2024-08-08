'use server';

import { redirect } from 'next/navigation';

import { shopService, UserErrorCode, userService } from '@/lib/shared/api';
import { setShopId, setToken } from '@/lib/shared/cookies';

export const signup = async ({ email, password, store }: Input) => {
  const createUserResult = await userService.create({ email, password });
  const accessTokenResult = await userService.generateAccessToken({ email, password });

  if (!createUserResult.success) {
    if (createUserResult.errorCode === UserErrorCode.EmailAlreadyExists) {
      return { error: createUserResult.error, field: 'email' };
    }
    return { error: createUserResult.error };
  }

  if (!accessTokenResult.success) {
    return { error: accessTokenResult.error };
  }

  setToken(accessTokenResult.accessToken);

  await shopService.create({ name: store });

  const shops = await shopService.getAll();
  const shop = shops.items[0]; // By now we only support one shop per user, TODO: Remove in the future
  setShopId(shop.id);

  redirect(`/shops/${shop.slug}`);
};

type Input = { email: string; password: string; store: string };

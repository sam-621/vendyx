'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { ShopService, UserService } from '@/api/services';
import { UserErrorCode } from '@/api/types';
import { setShopId, setToken } from '@/lib/shared/cookies';

export const signup = async ({ email, password, store }: Input) => {
  const createUserResult = await UserService.create({ email, password });

  if (!createUserResult.success) {
    if (createUserResult.errorCode === UserErrorCode.EmailAlreadyExists) {
      return { error: createUserResult.error, field: 'email' };
    }
    return { error: createUserResult.error };
  }

  const accessTokenResult = await UserService.generateAccessToken({ email, password });

  if (!accessTokenResult.success) {
    return { error: accessTokenResult.error };
  }

  setToken(accessTokenResult.accessToken);

  const { id: shopId, slug: shopSlug } = await ShopService.create({ name: store });

  setShopId(shopId);

  revalidateTag(ShopService.Tags.shops);
  redirect(`/shops/${shopSlug}`);
};

type Input = { email: string; password: string; store: string };

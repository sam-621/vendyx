'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { ShopService, UserService } from '@/api';
import { UserErrorCode } from '@/api/codegen/graphql';
import { setShopId, setToken } from '@/lib/cookies';

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

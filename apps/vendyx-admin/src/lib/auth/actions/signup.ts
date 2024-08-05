'use server';

import { redirect } from 'next/navigation';

import { shopService, UserErrorCode, userService } from '@/lib/shared/api';
import { setToken } from '@/lib/shared/cookies';

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

  await shopService.create(createUserResult.userId, { name: store });

  redirect('/');
};

type Input = { email: string; password: string; store: string };

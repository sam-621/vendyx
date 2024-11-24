'use server';

import { redirect } from 'next/navigation';

import { UserService } from '@/api/services';
import { UserErrorCode } from '@/api/types';
import { setToken } from '@/lib/shared/cookies';

export const signup = async ({ email, password }: Input) => {
  const createUserResult = await UserService.create({ email, password });

  if (!createUserResult.success) {
    if (
      [UserErrorCode.EmailAlreadyExists, UserErrorCode.InvalidEmail].includes(
        createUserResult.errorCode
      )
    ) {
      return { error: createUserResult.error, field: 'email' };
    }
    return { error: createUserResult.error };
  }

  const accessTokenResult = await UserService.generateAccessToken({ email, password });

  if (!accessTokenResult.success) {
    return { error: accessTokenResult.error };
  }

  setToken(accessTokenResult.accessToken);
  redirect('/confirm-account');
};

type Input = { email: string; password: string };

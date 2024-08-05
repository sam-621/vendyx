'use server';

import { redirect } from 'next/navigation';

import { userService } from '@/lib/shared/api';
import { setToken } from '@/lib/shared/cookies';

export const login = async (email: string, password: string) => {
  const result = await userService.generateAccessToken({ email, password });

  if (!result.success) {
    return { error: result.error };
  }

  setToken(result.accessToken);
  redirect('/');
};

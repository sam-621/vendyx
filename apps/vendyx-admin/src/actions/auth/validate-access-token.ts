'use server';

import { UserService } from '@/api';
import { getToken } from '@/lib/cookies';

export const validateAccessToken = async () => {
  const accessToken = getToken();

  if (!accessToken) return false;

  const result = await UserService.validateAccessToken();

  return result;
};

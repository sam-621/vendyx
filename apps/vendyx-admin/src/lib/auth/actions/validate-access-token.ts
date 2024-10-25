'use server';

import { UserService } from '@/api/services';
import { getToken } from '@/lib/shared/cookies';

export const validateAccessToken = async () => {
  const accessToken = getToken();

  if (!accessToken) return false;

  const result = await UserService.validateAccessToken();

  return result;
};

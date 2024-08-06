'use server';

import { userService } from '@/lib/shared/api';
import { getToken } from '@/lib/shared/cookies';

export const validateAccessToken = async () => {
  const accessToken = getToken();

  if (!accessToken) return false;

  const result = await userService.validateAccessToken();

  return result;
};

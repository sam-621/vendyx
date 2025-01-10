'use server';

import { UserService } from '@/api/services/user.service';
import { getToken } from '@/shared/cookies/cookies';

export const validateAccessToken = async () => {
  const accessToken = getToken();

  if (!accessToken) return false;

  const result = await UserService.validateAccessToken();

  return result;
};

import { useState } from 'react';

import { cookies, CookiesKeys, queryClient } from '@/lib/shared';

import { AuthKeys } from './auth-keys';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);

    cookies.remove(CookiesKeys.TOKEN);
    await queryClient.invalidateQueries({ queryKey: AuthKeys.validate });

    setIsLoading(false);
  };

  return {
    logout,
    isLoading
  };
};

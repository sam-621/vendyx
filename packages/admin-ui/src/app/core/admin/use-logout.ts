import { useState } from 'react';

import { cookies, CookiesKeys } from '@/lib/cookies';
import { queryClient } from '@/lib/query-client';

import { AdminKeys } from './admin-keys';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);

    cookies.remove(CookiesKeys.TOKEN);
    await queryClient.invalidateQueries({ queryKey: AdminKeys.validate });

    setIsLoading(false);
  };

  return {
    logout,
    isLoading
  };
};

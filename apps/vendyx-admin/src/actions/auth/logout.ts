'use server';

import { redirect } from 'next/navigation';

import { removeShopId, removeToken } from '@/lib/cookies';

export const logout = () => {
  removeToken();
  removeShopId();

  redirect('/login');
};

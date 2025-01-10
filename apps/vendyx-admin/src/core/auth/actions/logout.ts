'use server';

import { redirect } from 'next/navigation';

import { removeActiveShop, removeToken } from '@/shared/cookies/cookies';

export const logout = () => {
  removeToken();
  removeActiveShop();

  redirect('/login');
};

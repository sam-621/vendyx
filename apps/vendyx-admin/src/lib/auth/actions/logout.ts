'use server';

import { redirect } from 'next/navigation';

import { removeActiveShop, removeToken } from '@/lib/shared/cookies';

export const logout = () => {
  removeToken();
  removeActiveShop();

  redirect('/login');
};

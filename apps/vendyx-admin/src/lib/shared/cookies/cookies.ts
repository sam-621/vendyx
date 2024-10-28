import { cookies } from 'next/headers';

import { CookiesDurations, CookiesNames } from './cookies-constants';
import { type ActiveShop } from './cookies-values';

export const setToken = (token: string) => {
  cookies().set(CookiesNames.AdminToken, token, { maxAge: CookiesDurations.days_7 });
};

export const removeToken = () => {
  cookies().delete(CookiesNames.AdminToken);
};

export const getToken = () => {
  return cookies().get(CookiesNames.AdminToken)?.value;
};

export const setActiveShop = (input: ActiveShop) => {
  cookies().set(CookiesNames.ActiveShop, JSON.stringify(input), {
    maxAge: CookiesDurations.infinite
  });
};

export const getActiveShop = (): ActiveShop | null => {
  const activeShop = cookies().get(CookiesNames.ActiveShop)?.value;

  return activeShop ? JSON.parse(activeShop) : null;
};

export const removeActiveShop = () => {
  cookies().delete(CookiesNames.ActiveShop);
};

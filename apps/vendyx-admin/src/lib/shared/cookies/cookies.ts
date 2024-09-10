import { cookies } from 'next/headers';

import { CookiesDurations, CookiesNames } from './cookies-constants';

export const setToken = (token: string) => {
  cookies().set(CookiesNames.AdminToken, token, { maxAge: CookiesDurations.days_7 });
};

export const removeToken = () => {
  cookies().delete(CookiesNames.AdminToken);
};

export const getToken = () => {
  return cookies().get(CookiesNames.AdminToken)?.value;
};

export const setShopId = (shopId: string) => {
  cookies().set(CookiesNames.ShopId, shopId, { maxAge: CookiesDurations.infinite });
};

export const getShopId = () => {
  return cookies().get(CookiesNames.ShopId)?.value;
};

export const removeShopId = () => {
  cookies().delete(CookiesNames.ShopId);
};

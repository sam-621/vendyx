import { cookies } from 'next/headers';

import { CookiesDurations, CookiesNames } from './cookies-constants';

export const setToken = (token: string) => {
  cookies().set(CookiesNames.AdminToken, token, { maxAge: CookiesDurations.days_7 });
};

export const getToken = () => {
  return cookies().get(CookiesNames.AdminToken)?.value;
};

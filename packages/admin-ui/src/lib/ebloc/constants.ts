import { type THashMap } from '@ebloc/common';

const URLS: THashMap = {
  /**
   * Run app pointing to your api server running on local.
   * Helpful when you are working on both the app and the api.
   */
  localhost: 'http://localhost:3000',
  /**
   * Run app pointing to your api dev server.
   * Helpful when you are only working on the app and not the api server.
   */
  development: 'https://dev-ebloc.up.railway.app',
  /**
   * Run app pointing to your api production server.
   * This is empty because the app is built to be deployed to the same server as the api.
   */
  production: ''
};

export const EBLOC_BASE_API_URL = URLS[import.meta.env.MODE] ?? '';

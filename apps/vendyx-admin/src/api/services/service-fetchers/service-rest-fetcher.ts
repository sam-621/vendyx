import { restFetcher, type RestFetcherOptions } from '@/api/fetchers';
import { getActiveShop, getToken } from '@/lib/shared/cookies';

/**
 * A fetcher created to work on the server side with services for rest requests
 */
export const serviceRestFetcher = async <R>(url: string, options?: Options) =>
  await restFetcher<R>(url, {
    method: options?.method ?? 'GET',
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      shop_id: getActiveShop()?.id ?? '',
      ...options?.headers
    }
  });

type Options = RestFetcherOptions;

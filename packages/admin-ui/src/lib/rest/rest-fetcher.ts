import { EBLOC_BASE_API_URL } from '../ebloc/constants';

export const restFetcher = async <T>({
  body,
  config,
  url
}: RestFetcherInput): Promise<T | undefined> => {
  try {
    const response = await fetch(`${EBLOC_BASE_API_URL}/${url}`, {
      method: config?.method ?? 'GET',
      body
    });

    const data = await response.json();

    return data as T;
  } catch (error) {
    console.log({
      error
    });
  }
};

type RestFetcherInput = {
  body?: any;
  config?: { method: 'POST' | 'GET' | 'DELETE' };
  url?: string;
};

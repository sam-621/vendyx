import { EBLOC_BASE_API_URL } from '../ebloc/constants';

export const restFetcher = async <T>(
  formData: FormData,
  config?: { method: 'POST' | 'GET' | 'DELETE' }
): Promise<T | undefined> => {
  try {
    const response = await fetch(`${EBLOC_BASE_API_URL}/upload`, {
      method: config?.method ?? 'POST',
      body: formData
    });

    const data = await response.json();

    return data as T;
  } catch (error) {
    console.log(error);
  }
};

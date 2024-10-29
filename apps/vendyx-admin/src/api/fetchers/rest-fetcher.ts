/**
 * A wrapper around the fetch API that makes rest request
 *
 * @example
 * const response = await restFetcher('/upload', {
 *   method: 'POST',
 *   body: formData
 * });
 */
export const restFetcher = async <R>(url: string, options?: RestFetcherOptions) => {
  const queryParams = options?.queryParams ? `?${options.queryParams.toString()}` : '';
  const baseUrl = options?.internal ? '' : process.env.VENDYX_ADMIN_BASE_API_URL;

  const result = await fetch(`${baseUrl}${url}${queryParams}`, {
    method: options?.method ?? 'GET',
    headers: {
      ...options?.headers
    },
    body: options?.body
  });

  return (await result.json()) as R;
};

export type RestFetcherOptions = {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: BodyInit;
  queryParams?: URLSearchParams;
  headers?: Record<string, string>;
  /**
   * If true, the request will be made to the internal next.js API
   */
  internal?: boolean;
};

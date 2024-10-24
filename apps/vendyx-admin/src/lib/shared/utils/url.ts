import { type ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

/**
 * Get the base path from the headers in server actions
 */
export const getBasePathFormHeaders = (headers: ReadonlyHeaders) => {
  const urlParts = headers
    .get('referer')
    ?.replace(headers.get('origin') ?? '', '')
    .split('/');

  if (!urlParts) {
    return '';
  }

  const [, shops, storeName] = urlParts;

  return `/${shops}/${storeName}`;
};

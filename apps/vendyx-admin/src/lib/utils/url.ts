import { type ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

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

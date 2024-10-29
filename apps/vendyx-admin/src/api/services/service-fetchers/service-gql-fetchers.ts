import { gqlFetcher, type GqlFetcherOptions } from '@/api/fetchers';
import { getActiveShop, getToken } from '@/lib/shared/cookies';

import { type TypedDocumentString } from '../../codegen/graphql';

/**
 * A fetcher creates to work on the server side with services for gql requests
 */
export const serviceGqlFetcher = async <R, V>(
  query: TypedDocumentString<R, V>,
  variables?: V,
  options?: Options
): Promise<R> =>
  await gqlFetcher<R, V>(query, variables, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      shop_id: getActiveShop()?.id ?? '',
      ...options?.headers
    }
  });

type Options = GqlFetcherOptions;

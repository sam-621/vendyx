import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { gqlFetcher } from './gql-fetcher'
import { ApiError } from '../errors'

/**
 * A wrapper around react-query's `useQuery` that uses graphql-request to fetch admin api.
 */
export const useGqlQuery = <R, V>(
  options: UseGqlQueryOptions<R, V>
): UseQueryResult<R, ApiError> => {
  return useQuery({
    queryKey: options.key,
    queryFn: async () => await gqlFetcher(options.document, options.variables),
  })
}

type UseGqlQueryOptions<R, V> = {
  document: TypedDocumentNode<R, V>
  key: string[]
  variables?: V
}

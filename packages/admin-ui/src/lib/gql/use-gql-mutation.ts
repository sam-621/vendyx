import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { gqlFetcher } from './gql-fetcher'
import { ApiError } from '../errors'

/**
 * A wrapper around react-query's `useMutation` that uses graphql-request to fetch admin api.
 */
export const useGqlMutation = <R, V>(
  options: UseGqlMutationOptions<R, V>
): UseMutationResult<R, ApiError> => {
  return useMutation({
    mutationFn: async () => await gqlFetcher(options.document, options.variables),
  })
}

type UseGqlMutationOptions<R, V> = {
  document: TypedDocumentNode<R, V>
  variables?: V
}

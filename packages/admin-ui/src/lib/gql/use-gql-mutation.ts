import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { gqlFetcher } from './gql-fetcher'
import { ApiError } from '../errors'

/**
 * A wrapper around react-query's `useMutation` that uses graphql-request to fetch admin api.
 */
export const useGqlMutation = <R, V>(
  document: TypedDocumentNode<R, V>
): UseMutationResult<R, ApiError, V> => {
  return useMutation({
    mutationFn: (variables: V) => gqlFetcher(document, variables),
  })
}

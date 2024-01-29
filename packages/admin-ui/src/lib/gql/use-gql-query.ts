import request, { Variables } from 'graphql-request'
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

/**
 * A wrapper around react-query's `useQuery` that uses graphql-request to fetch admin api.
 */
export const useGqlQuery = <R, V>(
  options: UseGqlQueryOptions<R, V>
): UseQueryResult<R, { message: string; code: string }> => {
  return useQuery({
    queryKey: options.key,
    queryFn: async () => {
      try {
        return await request({
          url: 'http://localhost:3000/admin-api',
          document: options.document,
          variables: options.variables as Variables,
        })
      } catch (error) {
        throw new ApiError(
          error.response.errors[0]?.message,
          error.response.errors[0].extensions?.code
        )
      }
    },
  })
}

type UseGqlQueryOptions<R, V> = {
  document: TypedDocumentNode<R, V>
  key: string[]
  variables?: V
}

class ApiError extends Error {
  constructor(message: string, public code: string) {
    super(message)
  }
}

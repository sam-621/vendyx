import request, { Variables } from 'graphql-request'
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQuery } from '@tanstack/react-query'

/**
 * A wrapper around react-query's `useQuery` that uses graphql-request to fetch admin api.
 */
export const useGqlQuery = <R, V>(options: UseGqlQueryOptions<R, V>) => {
  return useQuery({
    queryKey: options.key,
    queryFn: async () => {
      return await request({
        url: 'http://localhost:3000/admin-api',
        document: options.document,
        variables: options.variables as Variables,
      })
    },
  })
}

type UseGqlQueryOptions<R, V> = {
  document: TypedDocumentNode<R, V>
  key: string[]
  variables?: V
}

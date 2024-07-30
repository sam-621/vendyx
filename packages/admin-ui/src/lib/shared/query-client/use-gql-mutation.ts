import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { type GraphQLError } from 'graphql';

import { eblocFetcher } from '../ebloc/ebloc-fetcher';

/**
 * A wrapper around react-query's `useMutation` that uses graphql-request to fetch admin api.
 */
export const useGqlMutation = <R, V>(
  document: TypedDocumentNode<R, V>
): UseMutationResult<R, GraphQLError, V> => {
  return useMutation({
    mutationFn: async (variables: V) => await eblocFetcher(document, variables)
  });
};

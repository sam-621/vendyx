import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { GraphQLClient, type Variables } from 'graphql-request';

import { cookies, CookiesKeys } from '../cookies';
import { EBLOC_BASE_API_URL } from '../ebloc/constants';

// TODO: Replace with the actual graphql endpoint
const gqlClient = new GraphQLClient(`${EBLOC_BASE_API_URL}/admin-api`);

/**
 * A wrapper around graphql-request's `request` that make graphql typed request and manage errors
 */
export const gqlFetcher = async <R, V>(
  document: TypedDocumentNode<R, V>,
  variables?: V
): Promise<R> => {
  try {
    const token = cookies.get(CookiesKeys.TOKEN);

    gqlClient.setHeader('Authorization', token ? `Bearer ${token}` : '');

    return await gqlClient.request({
      document,
      variables: variables as Variables
    });

    // TODO: Handle unexpected http errors
  } catch (error) {
    console.log({
      error
    });

    throw new Error('gqlFetcher: Unexpected error');
  }
};

import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { GraphQLClient, type Variables } from 'graphql-request';

import { cookies, CookiesKeys } from '../cookies';
import { GraphqlError, UnexpectedError } from '../errors';
import { VENDYX_BASE_API_URL } from '../vendyx/constants';

// TODO: Replace with the actual graphql endpoint
const gqlClient = new GraphQLClient(`${VENDYX_BASE_API_URL}/admin-api`);

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.errors?.length) {
      throw new GraphqlError(
        String(error.response.errors[0]?.message),
        String(error.response.errors[0].extensions?.code)
      );
    }

    throw new UnexpectedError();
  }
};

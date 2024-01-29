import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import request, { Variables } from 'graphql-request'
import { ApiError, UnexpectedError } from '../errors'

/**
 * A wrapper around graphql-request's `request` that make graphql typed request and manage errors
 */
export const gqlFetcher = async <R, V>(
  document: TypedDocumentNode<R, V>,
  variables?: V
): Promise<R> => {
  try {
    return await request({
      url: 'http://localhost:3000/admin-api',
      document,
      variables: variables as Variables,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.errors?.length) {
      throw new ApiError(
        error.response.errors[0]?.message,
        error.response.errors[0].extensions?.code
      )
    }

    throw new UnexpectedError('An unexpected error occurred. Please reload and try again later.')
  }
}

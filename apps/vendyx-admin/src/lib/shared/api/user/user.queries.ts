import { graphql } from '../codegen';

export const GET_USER = graphql(`
  query GetUser($accessToken: String!) {
    user(accessToken: $accessToken) {
      id
    }
  }
`);

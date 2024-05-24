import { graphql } from '../codegen';

export const AuthenticateMutation = graphql(/* GraphQL */ `
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      authToken
      apiErrors {
        code
        message
      }
    }
  }
`);

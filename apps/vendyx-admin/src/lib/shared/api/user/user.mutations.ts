import { graphql } from '../codegen';

export const CREATE_USER = graphql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      apiErrors {
        code
        message
      }
      user {
        id
      }
    }
  }
`);

export const GENERATE_ACCESS_TOKEN = graphql(`
  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {
    generateUserAccessToken(input: $input) {
      apiErrors {
        code
        message
      }
      accessToken
    }
  }
`);

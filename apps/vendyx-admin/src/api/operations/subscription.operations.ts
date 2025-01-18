import { graphql } from '../codegen';

export const CREATE_CHECKOUT_SESSION_MUTATION = graphql(`
  mutation CreateCheckoutSession($input: CreateCheckoutSessionInput!) {
    createCheckoutSession(input: $input) {
      sessionUrl
    }
  }
`);

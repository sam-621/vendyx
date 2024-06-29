import { graphql } from '../codegen';

export const UpdateCustomerMutation = graphql(`
  mutation UpdateCustomer($id: ID!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      customer {
        id
      }
    }
  }
`);

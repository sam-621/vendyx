import { graphql } from '../codegen';

export const CreatePaymentMethodMutation = graphql(`
  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      apiErrors {
        code
        message
      }
      paymentMethod {
        id
      }
    }
  }
`);

export const UpdatePaymentMethodMutation = graphql(`
  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {
    updatePaymentMethod(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      paymentMethod {
        id
      }
    }
  }
`);

export const DeletePaymentMethodMutation = graphql(`
  mutation RemovePaymentMethod($removePaymentMethodId: ID!) {
    removePaymentMethod(id: $removePaymentMethodId) {
      apiErrors {
        code
        message
      }
      success
    }
  }
`);

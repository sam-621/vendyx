import { graphql } from '../codegen';

export const GET_ALL_PAYMENT_METHODS = graphql(`
  query GetPaymentMethods {
    paymentMethods {
      id
      name
      icon
      enabled
      integrationMetadata
    }
  }
`);

export const GET_PAYMENT_METHOD = graphql(`
  query GetPaymentMethod($id: ID!) {
    paymentMethod(id: $id) {
      id
      name
      icon
      enabled
      integrationMetadata
    }
  }
`);

export const CREATE_PAYMENT_METHOD = graphql(`
  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      id
    }
  }
`);

export const UPDATE_PAYMENT_METHOD = graphql(`
  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {
    updatePaymentMethod(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_PAYMENT_METHOD = graphql(`
  mutation RemovePaymentMethod($id: ID!) {
    removePaymentMethod(id: $id)
  }
`);

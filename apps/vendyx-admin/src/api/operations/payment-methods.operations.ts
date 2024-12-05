import { graphql } from '../codegen';

export const COMMON_PAYMENT_HANDLER_FRAGMENT = graphql(`
  fragment CommonPaymentHandler on PaymentHandler {
    icon
    name
    code
    args
  }
`);

export const COMMON_PAYMENT_METHOD_FRAGMENT = graphql(`
  fragment CommonPaymentMethod on PaymentMethod {
    id
    name
    icon
    enabled
    args
  }
`);

export const GET_ALL_PAYMENT_METHODS = graphql(`
  query GetPaymentMethods {
    paymentMethods {
      ...CommonPaymentMethod
    }
  }
`);

export const GET_PAYMENT_METHOD = graphql(`
  query GetPaymentMethod($id: ID!) {
    paymentMethod(id: $id) {
      ...CommonPaymentMethod
    }
  }
`);

export const GET_ALL_PAYMENT_HANDLERS = graphql(`
  query GetPaymentHandlers {
    paymentHandlers {
      ...CommonPaymentHandler
    }
  }
`);

export const CREATE_PAYMENT_METHOD = graphql(`
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

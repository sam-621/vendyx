import { graphql } from '../codegen';

export const CommonPaymentMethodFragment = graphql(`
  fragment CommonPaymentMethod on PaymentMethod {
    id
    name
    description
    enabled
    handler {
      code
    }
  }
`);

export const GetPaymentMethodsQuery = graphql(`
  query GetAllPaymentMethods {
    paymentMethods {
      items {
        ...CommonPaymentMethod
      }
    }
  }
`);

export const GetPaymentMethodQuery = graphql(`
  query GetPaymentMethod($paymentMethodId: ID!) {
    paymentMethod(id: $paymentMethodId) {
      ...CommonPaymentMethod
    }
  }
`);

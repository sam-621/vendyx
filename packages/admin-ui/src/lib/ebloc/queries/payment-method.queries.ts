import { graphql } from '../codegen';

export const CommonPaymentMethodFragment = graphql(`
  fragment CommonPaymentMethod on PaymentMethod {
    id
    createdAt
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
        id
        name
        description
        enabled
        handler {
          code
        }
      }
    }
  }
`);

export const GetPaymentMethodQuery = graphql(`
  query GetPaymentMethod($id: ID!) {
    paymentMethod(id: $id) {
      ...CommonPaymentMethod
    }
  }
`);

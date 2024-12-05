import { graphql } from '../codegen';

export const COMMON_SHIPPING_HANDLERS_FRAGMENT = graphql(`
  fragment CommonShippingHandlers on ShippingHandler {
    name
    code
    args
  }
`);

export const GET_ALL_SHIPPING_HANDLERS_QUERY = graphql(`
  query GetAllHandlers {
    shippingHandlers {
      ...CommonShippingHandlers
    }
  }
`);

export const CREATE_SHIPPING_METHOD_MUTATION = graphql(`
  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {
    createShippingMethod(input: $input) {
      apiErrors {
        code
        message
      }
      shippingMethod {
        id
      }
    }
  }
`);

export const UPDATE_SHIPPING_METHOD_MUTATION = graphql(`
  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {
    updateShippingMethod(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_SHIPPING_METHOD_MUTATION = graphql(`
  mutation RemoveShippingMethod($id: ID!) {
    removeShippingMethod(id: $id)
  }
`);

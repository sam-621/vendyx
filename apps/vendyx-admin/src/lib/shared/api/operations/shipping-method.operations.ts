import { graphql } from '../codegen';

export const GET_ALL_SHIPPING_HANDLERS = graphql(`
  query GetAllHandlers {
    shippingHandlers {
      id
      metadata
      name
    }
  }
`);

export const CREATE_SHIPPING_METHOD = graphql(`
  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {
    createShippingMethod(input: $input) {
      id
    }
  }
`);

export const UPDATE_SHIPPING_METHOD = graphql(`
  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {
    updateShippingMethod(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_SHIPPING_METHOD = graphql(`
  mutation RemoveShippingMethod($id: ID!) {
    removeShippingMethod(id: $id)
  }
`);

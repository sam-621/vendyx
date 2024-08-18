import { graphql } from '../codegen';

export const GET_ALL_SHIPPING_HANDLERS_QUERY = graphql(`
  query GetAllHandlers {
    shippingHandlers {
      id
      metadata
      name
    }
  }
`);

export const CREATE_SHIPPING_METHOD_MUTATION = graphql(`
  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {
    createShippingMethod(input: $input) {
      id
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

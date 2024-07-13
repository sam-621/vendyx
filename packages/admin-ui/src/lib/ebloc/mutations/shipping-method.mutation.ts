import { graphql } from '../codegen';

export const CreateShippingMethodMutation = graphql(`
  mutation CreateShippingMethod($zoneId: ID!, $input: CreateShippingMethodInput!) {
    createShippingMethod(zoneId: $zoneId, input: $input) {
      apiErrors {
        code
        message
      }
      shippingMethod {
        ...CommonShippingMethod
      }
    }
  }
`);

export const UpdateShippingMethodMutation = graphql(`
  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {
    updateShippingMethod(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      shippingMethod {
        ...CommonShippingMethod
      }
    }
  }
`);

export const RemoveShippingMethodMutation = graphql(`
  mutation RemoveShippingMethod($id: ID!) {
    removeShippingMethod(id: $id) {
      apiErrors {
        code
        message
      }
      success
    }
  }
`);

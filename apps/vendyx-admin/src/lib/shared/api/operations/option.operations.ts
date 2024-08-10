import { graphql } from '../codegen';

export const CREATE_OPTION_MUTATION = graphql(`
  mutation CreateOption($productId: ID!, $input: CreateOptionInput!) {
    createOption(productId: $productId, input: $input) {
      id
      name
      values {
        id
        name
      }
    }
  }
`);

export const UPDATE_OPTION_MUTATION = graphql(`
  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {
    updateOption(id: $id, input: $input) {
      id
      name
      values {
        id
        name
      }
    }
  }
`);

export const REMOVE_OPTION_MUTATION = graphql(`
  mutation RemoveOption($id: ID!) {
    softRemoveOption(id: $id) {
      id
    }
  }
`);

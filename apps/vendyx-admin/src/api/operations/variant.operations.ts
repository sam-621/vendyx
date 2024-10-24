import { graphql } from '../codegen';

export const CREATE_VARIANT_MUTATION = graphql(`
  mutation CreateVariant($productId: ID!, $input: CreateVariantInput!) {
    createVariant(productId: $productId, input: $input) {
      id
    }
  }
`);

export const UPDATE_VARIANT_MUTATION = graphql(`
  mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {
    updateVariant(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_VARIANT_MUTATION = graphql(`
  mutation SoftRemoveVariant($id: ID!) {
    softRemoveVariant(id: $id) {
      id
    }
  }
`);

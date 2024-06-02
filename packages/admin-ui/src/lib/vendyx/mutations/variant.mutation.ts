import { graphql } from '../codegen';

export const CreateVariantMutation = graphql(`
  mutation CreateVariant($createVariantProductId: ID!, $createVariantInput: CreateVariantInput!) {
    createVariant(productId: $createVariantProductId, input: $createVariantInput) {
      apiErrors {
        message
        code
      }
      variant {
        id
      }
    }
  }
`);

export const UpdateVariantMutation = graphql(`
  mutation UpdateVariant($updateVariantId: ID!, $updateVariantInput: UpdateVariantInput!) {
    updateVariant(id: $updateVariantId, input: $updateVariantInput) {
      apiErrors {
        message
        code
      }
      variant {
        id
      }
    }
  }
`);

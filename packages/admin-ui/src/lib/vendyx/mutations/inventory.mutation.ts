import { graphql } from '../codegen';

export const CreateProductMutation = graphql(`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(input: $createProductInput) {
      apiErrors {
        message
        code
      }
      product {
        id
      }
    }
  }
`);

export const CreateVariantMutation = graphql(`
  mutation CreateVariant($createVariantProductId: ID!, $createVariantInput: CreateVariantInput!) {
    createVariant(productId: $createVariantProductId, input: $createVariantInput) {
      id
    }
  }
`);

export const RemoveProductMutation = graphql(`
  mutation RemoveProduct($productId: ID!) {
    removeProduct(id: $productId) {
      apiErrors {
        code
        message
      }
      success
    }
  }
`);

export const UpdateProductMutation = graphql(`
  mutation UpdateProduct($productId: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $productId, input: $input) {
      apiErrors {
        code
        message
      }
      product {
        id
      }
    }
  }
`);

export const UpdateVariantMutation = graphql(`
  mutation UpdateVariant($updateVariantId: ID!, $updateVariantInput: UpdateVariantInput!) {
    updateVariant(id: $updateVariantId, input: $updateVariantInput) {
      id
    }
  }
`);

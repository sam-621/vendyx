import { graphql } from '../codegen';

export const CreateProductMutation = graphql(`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(input: $createProductInput) {
      id
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
    removeProduct(id: $productId)
  }
`);

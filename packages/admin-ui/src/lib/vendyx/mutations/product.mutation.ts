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

import { graphql } from '../codegen';

export const CreateProductMutation = graphql(`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(input: $createProductInput) {
      id
    }
  }
`);

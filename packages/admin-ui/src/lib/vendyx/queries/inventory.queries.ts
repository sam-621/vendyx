import { graphql } from '../codegen';

export const GetProductsQuery = graphql(`
  query GetProducts($input: ListInput) {
    products(input: $input) {
      count
      items {
        id
        createdAt
        name
        slug
        onlineOnly
        published
        variants(input: { take: 1 }) {
          items {
            id
            sku
            stock
            price
          }
        }
        assets(input: { take: 1 }) {
          items {
            id
            source
          }
        }
      }
    }
  }
`);

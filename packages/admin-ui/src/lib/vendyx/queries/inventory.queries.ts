import { graphql } from '../codegen';

export const ProductDetailsFragment = graphql(`
  fragment ProductDetailsFragment on Product {
    id
    createdAt
    name
    slug
    description
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
    assets {
      items {
        id
        name
        source
      }
    }
  }
`);

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

export const GetProductDetailsQuery = graphql(`
  query GetProductDetails($slug: String!) {
    product(slug: $slug) {
      ...ProductDetailsFragment
    }
  }
`);

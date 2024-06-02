import { graphql } from '../codegen';

export const ProductDetailsFragment = graphql(`
  fragment CommonProduct on Product {
    id
    createdAt
    name
    slug
    description
    onlineOnly
    published
    variants {
      items {
        id
        price
        sku
        stock
        published
        optionValues {
          id
          value
        }
      }
    }
    assets {
      items {
        id
        name
        source
        type
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

import { graphql } from '../codegen';

export const CommonProductFragment = graphql(`
  fragment CommonProduct on Product {
    id
    createdAt
    name
    slug
    description
    enabled
    options {
      id
      name
      values {
        id
        value
      }
    }
    variants {
      items {
        id
        price
        sku
        stock
        optionValues {
          id
          value
        }
      }
    }
    assets {
      items {
        id
        createdAt
        name
        source
        order
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
        enabled
        variants {
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
      ...CommonProduct
    }
  }
`);

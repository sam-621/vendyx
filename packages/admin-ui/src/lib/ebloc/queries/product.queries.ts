import { graphql } from '../codegen';

export const CommonProductFragment = graphql(`
  fragment CommonProduct on Product {
    id
    createdAt
    name
    slug
    description
    onlineOnly
    published
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

import { graphql } from '../codegen';

export const CommonCollection = graphql(`
  fragment CommonCollection on Collection {
    id
    createdAt
    name
    slug
    description
    enabled
    products {
      count
      items {
        id
        name
        published
        assets(input: { take: 1 }) {
          items {
            id
            source
          }
        }
        variants {
          items {
            stock
          }
        }
      }
    }
  }
`);

export const GetCollectionsQuery = graphql(`
  query GetCollections {
    collections {
      items {
        id
        createdAt
        name
        slug
        enabled
        products {
          count
        }
      }
    }
  }
`);

export const GetCollectionDetailsQuery = graphql(`
  query GetCollection($id: String) {
    collection(id: $id) {
      ...CommonCollection
    }
  }
`);

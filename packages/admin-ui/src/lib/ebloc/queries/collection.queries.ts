import { graphql } from '../codegen';

export const CommonCollection = graphql(`
  fragment CommonCollection on Collection {
    id
    createdAt
    name
    slug
    description
    published
    products {
      count
      items {
        id
        name
        slug
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
        published
        products {
          count
        }
      }
    }
  }
`);

export const GetCollectionDetailsQuery = graphql(`
  query GetCollection($id: ID!) {
    collection(id: $id) {
      ...CommonCollection
    }
  }
`);

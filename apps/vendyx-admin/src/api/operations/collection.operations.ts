import { graphql } from '../codegen';

export const GET_ALL_COLLECTIONS_QUERY = graphql(`
  query GetAllCollections($input: CollectionListInput) {
    collections(input: $input) {
      items {
        id
        name
        slug
        enabled
        assets(input: { take: 1 }) {
          items {
            id
            source
          }
        }
        products {
          count
        }
      }
    }
  }
`);

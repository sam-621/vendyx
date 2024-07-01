import { graphql } from '../codegen';

export const CreateCollectionMutation = graphql(`
  mutation CreateCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      apiErrors {
        code
        message
      }
      collection {
        id
      }
    }
  }
`);

export const UpdateCollectionMutation = graphql(`
  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {
    updateCollection(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      collection {
        id
      }
    }
  }
`);

export const RemoveCollectionMutation = graphql(`
  mutation RemoveCollection($id: ID!) {
    removeCollection(id: $id) {
      apiErrors {
        code
        message
      }
      success
    }
  }
`);

export const SetProductsInCollectionMutation = graphql(`
  mutation SetProductsInCollection($id: ID!, $productIds: [ID!]!) {
    setProductsInCollection(id: $id, productIds: $productIds) {
      apiErrors {
        code
        message
      }
      collection {
        id
      }
    }
  }
`);

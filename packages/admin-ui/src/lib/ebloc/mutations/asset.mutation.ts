import { graphql } from '../codegen';

export const RemoveAssetsMutation = graphql(`
  mutation RemoveAssets($ids: [ID!]!) {
    removeAssets(ids: $ids) {
      success
      apiErrors {
        code
        message
      }
    }
  }
`);

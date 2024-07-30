import { graphql } from '../codegen';

export const RemoveAssetMutation = graphql(`
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

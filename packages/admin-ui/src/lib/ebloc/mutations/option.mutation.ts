import { graphql } from '../codegen';

export const CreateOptionMutation = graphql(`
  mutation CreateOption($createOptionInput: CreateOptionInput!) {
    createOption(input: $createOptionInput) {
      apiErrors {
        code
        message
      }
      option {
        id
        name
        values {
          id
          value
        }
      }
    }
  }
`);

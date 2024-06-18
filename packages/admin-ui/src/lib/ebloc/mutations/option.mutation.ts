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

export const RemoveOptionMutation = graphql(`
  mutation RemoveOption($id: ID!) {
    removeOption(id: $id) {
      success
    }
  }
`);

export const UpdateOptionMutation = graphql(`
  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {
    updateOption(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
    }
  }
`);

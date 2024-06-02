import { graphql } from '../codegen';

export const CreateOptionMutation = graphql(`
  mutation CreateOption($createOptionInput: CreateOptionInput!) {
    createOption(input: $createOptionInput) {
      id
      name
      values {
        id
        value
      }
    }
  }
`);

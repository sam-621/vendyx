import { graphql } from '../codegen';

export const CreateCountryMutation = graphql(`
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      apiErrors {
        code
        message
      }
      country {
        id
      }
    }
  }
`);

export const UpdateCountryMutation = graphql(`
  mutation UpdateCountry($id: ID!, $input: UpdateCountryInput!) {
    updateCountry(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      country {
        id
      }
    }
  }
`);

export const RemoveCountryMutation = graphql(`
  mutation RemoveCountry($id: ID!) {
    removeCountry(id: $id) {
      apiErrors {
        code
        message
      }
      success
    }
  }
`);

export const AddStatesToCountryMutation = graphql(`
  mutation AddStatesToCountry($id: ID!, $input: [CreateStateInput!]!) {
    addStatesToCountry(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      country {
        id
      }
    }
  }
`);

export const RemoveStatesFromCountryMutation = graphql(`
  mutation RemoveStatesFromCountry($id: ID!, $input: [ID!]!) {
    removeStatesFromCountry(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      country {
        id
      }
    }
  }
`);

export const UpdateStateMutation = graphql(`
  mutation UpdateState($id: ID!, $input: UpdateStateInput!) {
    updateState(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      state {
        id
        name
      }
    }
  }
`);

import { graphql } from '../codegen';

export const CreateCountryMutation = graphql(`
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      apiErrors {
        code
        message
      }
      country {
        ...CommonCountry
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
        ...CommonCountry
      }
    }
  }
`);

export const RemoveCountryMutation = graphql(`
  mutation RemoveCountry($removeCountryId: ID!) {
    removeCountry(id: $removeCountryId) {
      apiErrors {
        code
        message
      }
      success
    }
  }
`);

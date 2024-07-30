import { graphql } from '../codegen';

export const CreateZoneMutation = graphql(`
  mutation CreateZone($input: CreateZoneInput!) {
    createZone(input: $input) {
      apiErrors {
        code
        message
      }
      zone {
        id
      }
    }
  }
`);

export const UpdateZoneMutation = graphql(`
  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {
    updateZone(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      zone {
        id
      }
    }
  }
`);

export const RemoveZoneMutation = graphql(`
  mutation RemoveZone($id: ID!) {
    removeZone(id: $id) {
      apiErrors {
        code
        message
      }
      success
    }
  }
`);

export const SetCountriesToZoneMutation = graphql(`
  mutation SetCountriesInZone($id: ID!, $countriesIds: [ID!]!) {
    setCountriesToZone(id: $id, countriesIds: $countriesIds) {
      apiErrors {
        code
        message
      }
      zone {
        id
      }
    }
  }
`);

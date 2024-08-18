import { graphql } from '../codegen';

export const COMMON_ZONE_FRAGMENT = graphql(`
  fragment CommonZone on Zone {
    id
    name
    states {
      id
      name
      country {
        id
        name
      }
    }
    shippingMethods {
      id
      name
      description
      enabled
      handlerMetadata
      pricePreview
    }
  }
`);

export const GET_ALL_ZONES_QUERY = graphql(`
  query getAllZones {
    zones {
      id
      name
      shippingMethods {
        id
      }
    }
  }
`);

export const GET_ZONE_QUERY = graphql(`
  query GetZone($id: ID!) {
    zone(id: $id) {
      ...CommonZone
    }
  }
`);

export const CREATE_ZONE_MUTATION = graphql(`
  mutation CreateZone($input: CreateZoneInput!) {
    createZone(input: $input) {
      id
    }
  }
`);

export const UPDATE_ZONE_MUTATION = graphql(`
  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {
    updateZone(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_ZONE_MUTATION = graphql(`
  mutation RemoveZone($id: ID!) {
    removeZone(id: $id)
  }
`);

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
    }
  }
`);

export const GET_ALL_ZONES = graphql(`
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

export const GET_ZONE = graphql(`
  query GetZone($id: ID!) {
    zone(id: $id) {
      ...CommonZone
    }
  }
`);

export const CREATE_ZONE = graphql(`
  mutation CreateZone($input: CreateZoneInput!) {
    createZone(input: $input) {
      id
    }
  }
`);

export const UPDATE_ZONE = graphql(`
  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {
    updateZone(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_ZONE = graphql(`
  mutation RemoveZone($id: ID!) {
    removeZone(id: $id)
  }
`);

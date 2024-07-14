import { graphql } from '../codegen';

export const CommonZoneFragment = graphql(`
  fragment CommonZone on Zone {
    id
    createdAt
    name
    countries {
      items {
        id
        name
      }
    }
    shippingMethods {
      items {
        id
        name
        description
        priceCalculator {
          code
          args {
            key
            value
          }
        }
      }
    }
  }
`);

export const GetZonesQuery = graphql(`
  query GetZones {
    zones {
      items {
        id
        name
        shippingMethods {
          count
        }
      }
    }
  }
`);

export const GetZoneQuery = graphql(`
  query GetZone($id: ID!) {
    zone(id: $id) {
      ...CommonZone
    }
  }
`);

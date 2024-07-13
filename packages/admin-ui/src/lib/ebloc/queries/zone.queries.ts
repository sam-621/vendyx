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
        priceCalculatorCode
      }
    }
  }
`);

export const GetZonesQuery = graphql(`
  query GetZones {
    zones {
      items {
        id
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

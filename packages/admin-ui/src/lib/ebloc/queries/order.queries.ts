import { graphql } from '../codegen';

export const CommonOrder = graphql(`
  fragment CommonOrder on Order {
    id
    code
    createdAt
    subtotal
    total
    totalQuantity
    state
    lines {
      items {
        id
        linePrice
        quantity
        unitPrice
        productVariant {
          id
          sku
          optionValues {
            id
            value
          }
          product {
            name
            slug
            assets {
              items {
                id
                source
              }
            }
          }
        }
      }
    }
    customer {
      id
      firstName
      lastName
      email
      phoneNumber
      phoneCountryCode
    }
    shippingAddress {
      streetLine1
      streetLine2
      postalCode
      city
      province
      country
      phoneCountryCode
      phoneNumber
    }
    payment {
      id
      amount
      transactionId
      method {
        id
        name
        description
        enabled
      }
    }
    shipment {
      id
      amount
      trackingCode
      carrier
      method {
        id
        name
      }
    }
  }
`);

export const GetOrdersQuery = graphql(`
  query GetOrdersQuery {
    orders {
      count
      items {
        id
        code
        state
        total
        totalQuantity
        placedAt
        customer {
          id
          firstName
          lastName
        }
        shipment {
          id
          amount
          trackingCode
          method {
            id
            name
          }
        }
      }
    }
  }
`);

export const GetOrderDetails = graphql(`
  query GetOrderDetails($orderId: ID) {
    order(id: $orderId) {
      ...CommonOrder
    }
  }
`);

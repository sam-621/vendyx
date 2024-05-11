import { graphql } from '../codegen';

export const CommonOrder = graphql(`
  fragment CommonOrder on Order {
    id
    code
    createdAt
    subtotal
    total
    totalQuantity
    lines {
      items {
        id
        linePrice
        quantity
        unitPrice
        productVariant {
          id
          sku
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
      id
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

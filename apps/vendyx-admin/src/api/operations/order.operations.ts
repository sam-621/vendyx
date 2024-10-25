import { graphql } from '../codegen';

export const COMMON_ORDER_FRAGMENT = graphql(`
  fragment CommonOrder on Order {
    id
    createdAt
    code
    state
    subtotal
    total
    totalQuantity
    placedAt
    lines {
      items {
        id
        linePrice
        quantity
        unitPrice
        productVariant {
          id
          salePrice
        }
      }
    }
    customer {
      id
      email
      enabled
      firstName
      lastName
      phoneNumber
    }
    shippingAddress {
      streetLine1
      streetLine2
      postalCode
      city
      province
      country
      references
      fullName
    }
    shipment {
      id
      amount
      carrier
      method
      trackingCode
    }
    payment {
      id
      amount
      method
      transactionId
    }
  }
`);

export const GET_ALL_ORDERS_QUERY = graphql(`
  query GetAllOrdersQuery($input: OrderListInput) {
    orders(input: $input) {
      count
      pageInfo {
        total
      }
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
          method
        }
      }
    }
  }
`);

export const GET_ORDER_BY_ID_QUERY = graphql(`
  query GetOrderbyIdQuery($orderId: ID) {
    order(id: $orderId) {
      ...CommonOrder
    }
  }
`);

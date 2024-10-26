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
            name
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
      email
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

export const MARK_ORDER_AS_SHIPPED_MUTATION = graphql(`
  mutation MarkAsShipped($orderId: ID!, $input: MarkOrderAsShippedInput!) {
    markOrderAsShipped(id: $orderId, input: $input) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);

export const MARK_ORDER_AS_DELIVERED_MUTATION = graphql(`
  mutation MarkAsDelivered($orderId: ID!) {
    markOrderAsDelivered(id: $orderId) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);

export const CANCEL_ORDER_MUTATION = graphql(`
  mutation CancelOrder($orderId: ID!) {
    cancelOrder(id: $orderId) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);
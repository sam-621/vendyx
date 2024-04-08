import { graphql } from '../codegen';

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

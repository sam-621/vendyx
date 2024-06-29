import { graphql } from '../codegen';

export const GetCustomersQuery = graphql(`
  query GetCustomers {
    customers {
      count
      items {
        id
        firstName
        lastName
        email
        enabled
        orders {
          count
          items {
            total
          }
        }
      }
    }
  }
`);

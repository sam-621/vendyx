import { graphql } from '../codegen';

export const CommonCustomer = graphql(`
  fragment CommonCustomer on Customer {
    id
    createdAt
    firstName
    lastName
    email
    phoneNumber
    enabled
    orders {
      count
      items {
        id
        code
        placedAt
        state
        total
        shipment {
          method
        }
      }
    }
  }
`);

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

export const GetCustomerDetailsQuery = graphql(`
  query GetCustomerDetails($id: ID!) {
    customer(id: $id) {
      ...CommonCustomer
    }
  }
`);

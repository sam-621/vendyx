import { graphql } from '../codegen';

export const COMMON_CUSTOMER_FRAGMENT = graphql(`
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

export const GET_ALL_CUSTOMERS_QUERY = graphql(`
  query GetAllCustomersQuery($input: CustomerListInput) {
    customers(input: $input) {
      count
      pageInfo {
        total
      }
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

export const GET_CUSTOMER_BY_ID_QUERY = graphql(`
  query GetCustomerByIdQuery($id: ID!) {
    customer(id: $id) {
      ...CommonCustomer
    }
  }
`);

export const UPDATE_CUSTOMER_MUTATION = graphql(`
  mutation UpdateCustomerMutation($customerId: ID!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $customerId, input: $input) {
      apiErrors {
        code
        message
      }
      customer {
        id
      }
    }
  }
`);

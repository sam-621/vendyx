import { graphql } from '../gql'

export const AuthenticateMutation = graphql(/* GraphQL */ `
  query GetProducts {
    products {
      count
      items {
        id
        createdAt
        updatedAt
        name
        slug
        description
        onlineOnly
        published
        variants(input: { take: 0 }) {
          count
          items {
            id
            sku
            stock
            price
            optionValues {
              id
              value
            }
          }
        }
        assets(input: { take: 1 }) {
          count
          items {
            id
            name
          }
        }
      }
    }
  }
`)

import { graphql } from '../codegen';

export const GET_SHOPS_QUERY = graphql(`
  query getShops {
    shops {
      count
      items {
        id
        slug
      }
    }
  }
`);

export const GET_SHOP_QUERY = graphql(`
  query Shop($slug: String!) {
    shop(slug: $slug) {
      id
      name
      slug
    }
  }
`);

export const CREATE_SHOP_MUTATION = graphql(`
  mutation CreateShop($ownerId: ID!, $input: CreateShopInput!) {
    createShop(ownerId: $ownerId, input: $input) {
      id
      name
      slug
    }
  }
`);

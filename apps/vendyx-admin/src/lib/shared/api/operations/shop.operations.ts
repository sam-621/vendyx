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
  mutation CreateShop($input: CreateShopInput!) {
    createShop(input: $input) {
      id
      name
      slug
    }
  }
`);

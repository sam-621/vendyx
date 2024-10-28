import { graphql } from '../codegen';

export const COMMON_SHOP_FRAGMENT = graphql(`
  fragment CommonShop on Shop {
    id
    name
    slug
  }
`);

export const GET_SHOPS_QUERY = graphql(`
  query getShops {
    shops {
      items {
        ...CommonShop
      }
    }
  }
`);

export const GET_SHOP_QUERY = graphql(`
  query Shop($slug: String!) {
    shop(slug: $slug) {
      ...CommonShop
    }
  }
`);

export const CREATE_SHOP_MUTATION = graphql(`
  mutation CreateShop($input: CreateShopInput!) {
    createShop(input: $input) {
      id
      slug
    }
  }
`);

import { getFragmentData } from '../codegen';
import { type CreateShopInput } from '../codegen/graphql';
import { COMMON_SHOP_FRAGMENT, CREATE_SHOP_MUTATION, GET_SHOPS_QUERY } from '../operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const ShopService = {
  Tags: {
    shops: 'shops',
    shop: (id: string) => `shop-${id}`
  },

  async getAll() {
    const result = await serviceGqlFetcher(GET_SHOPS_QUERY, {}, { tags: [ShopService.Tags.shops] });

    const shops = result.shops.items.map(s => getFragmentData(COMMON_SHOP_FRAGMENT, s));

    return shops;
  },

  async create(input: CreateShopInput) {
    const { createShop } = await serviceGqlFetcher(CREATE_SHOP_MUTATION, { input });

    return createShop;
  }
};

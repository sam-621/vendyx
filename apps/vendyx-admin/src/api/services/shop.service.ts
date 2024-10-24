import { type CreateShopInput } from '../codegen/graphql';
import { CREATE_SHOP_MUTATION, GET_SHOPS_QUERY } from '../operations';
import { fetcher } from './fetcher';

export const ShopService = {
  Tags: {
    shops: 'shops',
    shop: (id: string) => `shop-${id}`
  },

  async getAll() {
    const { shops } = await fetcher(GET_SHOPS_QUERY, {}, { tags: [ShopService.Tags.shops] });

    return shops;
  },

  async create(input: CreateShopInput) {
    const { createShop } = await fetcher(CREATE_SHOP_MUTATION, { input });

    return createShop;
  }
};

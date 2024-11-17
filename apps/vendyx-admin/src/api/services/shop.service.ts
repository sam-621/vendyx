import { getFragmentData } from '../codegen';
import { type CreateShopInput, type UpdateShopInput } from '../codegen/graphql';
import {
  COMMON_LIST_SHOP_FRAGMENT,
  COMMON_SHOP_FRAGMENT,
  CREATE_SHOP_MUTATION,
  GET_SHOP_BY_SLUG_QUERY,
  GET_SHOPS_QUERY,
  UPDATE_SHOP_MUTATION
} from '../operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const ShopService = {
  Tags: {
    shops: 'shops',
    shop: (id: string) => `shop-${id}`
  },

  async getAll() {
    const result = await serviceGqlFetcher(GET_SHOPS_QUERY, {}, { tags: [ShopService.Tags.shops] });

    const shops = result.shops.items.map(s => getFragmentData(COMMON_LIST_SHOP_FRAGMENT, s));

    return shops;
  },

  async getBySlug(slug: string) {
    const result = await serviceGqlFetcher(
      GET_SHOP_BY_SLUG_QUERY,
      { slug },
      { tags: [ShopService.Tags.shop(slug)] }
    );

    return getFragmentData(COMMON_SHOP_FRAGMENT, result.shop);
  },

  async create(input: CreateShopInput) {
    const { createShop } = await serviceGqlFetcher(CREATE_SHOP_MUTATION, { input });

    return createShop;
  },

  async update(shopSlug: string, input: UpdateShopInput) {
    const { updateShop } = await serviceGqlFetcher(UPDATE_SHOP_MUTATION, { shopSlug, input });

    return updateShop;
  }
};

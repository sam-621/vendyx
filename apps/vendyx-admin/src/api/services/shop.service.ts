import { getFragmentData } from '../codegen';
import { type CreateShopInput, type ShopErrorCode, type UpdateShopInput } from '../codegen/graphql';
import { getShopError } from '../errors';
import {
  COMMON_LIST_SHOP_FRAGMENT,
  COMMON_SHOP_FRAGMENT,
  CREATE_SHOP_MUTATION,
  GET_SHOP_BY_SLUG_QUERY,
  GET_SHOPS_QUERY,
  UPDATE_SHOP_MUTATION
} from '../operations';
import { type ID } from '../scalars';
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

  async create(input: CreateShopInput): Promise<ShopResult> {
    const {
      createShop: { apiErrors, shop }
    } = await serviceGqlFetcher(CREATE_SHOP_MUTATION, { input });

    const error = getShopError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { success: true, shop: shop! };
  },

  async update(shopSlug: string, input: UpdateShopInput): Promise<ShopResult> {
    const {
      updateShop: { apiErrors, shop }
    } = await serviceGqlFetcher(UPDATE_SHOP_MUTATION, { shopSlug, input });

    const error = getShopError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { success: true, shop: shop! };
  }
};

type ShopResult =
  | {
      success: true;
      shop: { id: ID; slug: string };
    }
  | {
      success: false;
      error: string;
      errorCode: ShopErrorCode;
    };

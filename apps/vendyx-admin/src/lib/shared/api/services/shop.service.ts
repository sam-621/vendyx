import { type CreateShopInput } from '../codegen/graphql';
import { CREATE_SHOP_MUTATION, GET_SHOPS_QUERY } from '../operations';
import { fetcher } from './fetcher';

const getAll = async () => {
  const { shops } = await fetcher(GET_SHOPS_QUERY);

  return shops;
};

const create = async (input: CreateShopInput) => {
  return await fetcher(CREATE_SHOP_MUTATION, { input });
};

export const shopService = {
  getAll,
  create
};

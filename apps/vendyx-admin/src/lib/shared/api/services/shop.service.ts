import { type CreateShopInput } from '../codegen/graphql';
import { CREATE_SHOP_MUTATION } from '../operations';
import { fetcher } from './fetcher';

const create = async (ownerId: string, input: CreateShopInput) => {
  return await fetcher(CREATE_SHOP_MUTATION, { ownerId, input });
};

export const shopService = {
  create
};

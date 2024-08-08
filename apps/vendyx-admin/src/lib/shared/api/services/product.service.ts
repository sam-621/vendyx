import { type CreateProductInput, type UpdateProductInput } from '../codegen/graphql';
import {
  CREATE_PRODUCT_MUTATION,
  GET_ALL_PRODUCTS_QUERY,
  GET_PRODUCT_BY_ID_QUERY,
  REMOVE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION
} from '../operations';
import { fetcher } from './fetcher';

const getAll = async () => {
  return await fetcher(GET_ALL_PRODUCTS_QUERY);
};

const getById = async (id: string) => {
  return await fetcher(GET_PRODUCT_BY_ID_QUERY, { id });
};

const create = async (input: CreateProductInput) => {
  return await fetcher(CREATE_PRODUCT_MUTATION, { input });
};

const update = async (id: string, input: UpdateProductInput) => {
  return await fetcher(UPDATE_PRODUCT_MUTATION, { id, input });
};

const remove = async (id: string) => {
  return await fetcher(REMOVE_PRODUCT_MUTATION, { id });
};

export const productService = {
  getAll,
  getById,
  create,
  update,
  remove
};

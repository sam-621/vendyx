import { getFragmentData } from '../codegen';
import { type CreateProductInput, type UpdateProductInput } from '../codegen/graphql';
import {
  COMMON_PRODUCT_FRAGMENT,
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
  const result = await fetcher(GET_PRODUCT_BY_ID_QUERY, { id });
  const data = getFragmentData(COMMON_PRODUCT_FRAGMENT, result.product);

  return data;
};

const create = async (input: CreateProductInput) => {
  const { createProduct } = await fetcher(CREATE_PRODUCT_MUTATION, { input });

  return createProduct;
};

const update = async (id: string, input: UpdateProductInput) => {
  const { updateProduct } = await fetcher(UPDATE_PRODUCT_MUTATION, { id, input });

  return updateProduct;
};

const remove = async (id: string) => {
  const { softRemoveProduct } = await fetcher(REMOVE_PRODUCT_MUTATION, { id });

  return softRemoveProduct;
};

export const productService = {
  getAll,
  getById,
  create,
  update,
  remove
};

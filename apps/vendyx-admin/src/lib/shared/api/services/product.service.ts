import { getFragmentData } from '../codegen';
import {
  type CreateProductInput,
  type ProductListInput,
  type UpdateProductInput
} from '../codegen/graphql';
import {
  COMMON_PRODUCT_FRAGMENT,
  CREATE_PRODUCT_MUTATION,
  GET_ALL_PRODUCTS_QUERY,
  GET_PRODUCT_BY_ID_QUERY,
  REMOVE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION
} from '../operations';
import { fetcher } from './fetcher';

const getAll = async (input?: ProductListInput) => {
  const { products } = await fetcher(
    GET_ALL_PRODUCTS_QUERY,
    { input },
    { tags: [ProductTags.products] }
  );

  return products;
};

const getById = async (id: string) => {
  const result = await fetcher(
    GET_PRODUCT_BY_ID_QUERY,
    { id },
    { tags: [ProductTags.product(id)] }
  );
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

const massiveRemove = async (ids: string[]) => {
  const { softRemoveProduct } = await fetcher(REMOVE_PRODUCT_MUTATION, { ids });

  return softRemoveProduct;
};

export const productService = {
  getAll,
  getById,
  create,
  update,
  massiveRemove
};

export const ProductTags = {
  products: 'products',
  product: (id: string) => `product-${id}`
};

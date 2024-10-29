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
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const ProductService = {
  Tags: {
    products: 'products',
    product: (id: string) => `product-${id}`
  },

  async getAll(input?: ProductListInput) {
    const { products } = await serviceGqlFetcher(
      GET_ALL_PRODUCTS_QUERY,
      { input },
      { tags: [ProductService.Tags.products] }
    );

    return products;
  },

  async getById(id: string) {
    const result = await serviceGqlFetcher(
      GET_PRODUCT_BY_ID_QUERY,
      { id },
      { tags: [ProductService.Tags.product(id)] }
    );
    const data = getFragmentData(COMMON_PRODUCT_FRAGMENT, result.product);

    return data;
  },

  async create(input: CreateProductInput) {
    const { createProduct } = await serviceGqlFetcher(CREATE_PRODUCT_MUTATION, { input });

    return createProduct;
  },

  async update(id: string, input: UpdateProductInput) {
    const { updateProduct } = await serviceGqlFetcher(UPDATE_PRODUCT_MUTATION, { id, input });

    return updateProduct;
  },

  async massiveRemove(ids: string[]) {
    const { softRemoveProduct } = await serviceGqlFetcher(REMOVE_PRODUCT_MUTATION, { ids });

    return softRemoveProduct;
  }
};

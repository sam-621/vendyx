import { GetProductsQuery, useGqlQuery } from '@/lib/shared';

import { ProductKeys } from './product.keys';

export const useGetProducts = () => {
  const { data, isLoading } = useGqlQuery({ document: GetProductsQuery, key: ProductKeys.all });

  return {
    products: data?.products.items,
    isLoading
  };
};

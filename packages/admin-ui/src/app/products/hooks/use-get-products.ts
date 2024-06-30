import { GetProductsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { ProductKeys } from './product.keys';

export const useGetProducts = () => {
  const { data, isLoading } = useGqlQuery({ document: GetProductsQuery, key: ProductKeys.all });

  return {
    products: data?.products.items,
    isLoading
  };
};

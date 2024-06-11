import { useGqlQuery } from '@/lib/gql';
import { GetProductsQuery } from '@/lib/ebloc/queries';

import { InventoryKeys } from './inventory.keys';

export const useGetProducts = () => {
  const { data, isLoading } = useGqlQuery({ document: GetProductsQuery, key: InventoryKeys.all });

  return {
    products: data?.products.items,
    isLoading
  };
};

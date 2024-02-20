import { useGqlQuery } from '@/lib/gql';
import { GetProductsQuery } from '@/lib/vendyx/queries';

export const useGetProducts = () => {
  const { data, isLoading } = useGqlQuery({ document: GetProductsQuery });

  return {
    products: data?.products.items,
    isLoading
  };
};

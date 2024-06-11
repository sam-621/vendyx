import { useGqlQuery } from '@/lib/gql';
import { GetOrdersQuery } from '@/lib/ebloc/queries';

import { OrderKeys } from './order.keys';

export const useGetOrders = () => {
  const { data, isLoading } = useGqlQuery({ document: GetOrdersQuery, key: OrderKeys.all });

  return {
    orders: data?.orders?.items,
    isLoading
  };
};

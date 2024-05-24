import { useGqlQuery } from '@/lib/gql';
import { useFragment } from '@/lib/vendyx/codegen';
import { CommonOrder, GetOrderDetails } from '@/lib/vendyx/queries';

import { OrderKeys } from './order.keys';

export const useGetOrderDetails = (id: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetOrderDetails,
    variables: { orderId: id },
    key: OrderKeys.single(id)
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const order = useFragment(CommonOrder, data?.order);

  return {
    order,
    isLoading
  };
};

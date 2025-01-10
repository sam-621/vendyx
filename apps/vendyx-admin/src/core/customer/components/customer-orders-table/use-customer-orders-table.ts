import { useCallback, useState } from 'react';

import { restFetcher } from '@/api/fetchers/rest-fetcher';
import { type CommonCustomerFragment, type CommonCustomerOrderFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils/internal-api-response';
import { useEntityContext } from '@/shared/contexts/entity-context';
import { PAGINATION_PAGE_SIZE } from '@/shared/hooks/use-pagination';

export const useCustomerOrdersTable = () => {
  const { entity: customer } = useEntityContext<CommonCustomerFragment>();

  const [isLoading, setIsLoading] = useState(true);

  const [orders, setOrders] = useState<CommonCustomerOrderFragment[]>([]);

  const fetchOrders = useCallback(async (page: number, search: string) => {
    setIsLoading(true);
    const searchParams = new URLSearchParams({
      page: page.toString(),
      size: PAGINATION_PAGE_SIZE.toString(),
      search,
      customerId: customer.id
    });

    const { data: orders } = await restFetcher<InternalApiOrders>('/customer/orders', {
      queryParams: searchParams,
      internal: true,
      tags: ['client-customer-orders', customer.id]
    });

    setOrders(orders);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    fetchOrders,
    orders
  };
};

type InternalApiOrders = InternalApiResponse<CommonCustomerOrderFragment[]>;

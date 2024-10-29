import { useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

import { restFetcher } from '@/api/fetchers';
import { type CommonCustomerFragment, type CommonCustomerOrderFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  OrderStatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';
import { useBase } from '@/lib/shared/hooks';
import { formatDate, formatPrice } from '@/lib/shared/utils';

const PAGE_SIZE = 10;

export const CustomerOrdersTableCard = () => {
  const base = useBase();
  const { entity: customer } = useEntityContext<CommonCustomerFragment>();

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState<CommonCustomerOrderFragment[]>([]);

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
    setPage(1);
  }, 300);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: PAGE_SIZE.toString(),
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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <CardTitle>Orders</CardTitle>
        {isLoading && <Loader2Icon size={16} className="animate-spin" />}
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Input placeholder="Search..." onChange={e => handleSearch(e.target.value)} />

          <Button
            disabled={page === 1 || isLoading}
            type="button"
            variant="outline"
            onClick={() => setPage(page === 1 ? page : page - 1)}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <span>{page}</span>
          <Button
            type="button"
            disabled={orders.length < PAGE_SIZE || isLoading}
            variant="outline"
            onClick={() => setPage(orders.length < PAGE_SIZE ? page : page + 1)}
          >
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Shipment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!orders.length ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href={`${base}/orders/${order.id}`} className="w-full hover:underline">
                      {order.code}
                    </Link>
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {formatDate(new Date(order.placedAt as string))}
                  </TableCell>
                  <TableCell>{order.shipment?.method}</TableCell>
                  <TableCell>{formatPrice(order.total)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.state} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type InternalApiOrders = InternalApiResponse<CommonCustomerOrderFragment[]>;

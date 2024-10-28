import { useEffect, useState } from 'react';

import Link from 'next/link';

import { CustomerService } from '@/api/services';
import { type CommonCustomerFragment, type CommonCustomerOrderFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

export const CustomerOrdersTableCard = () => {
  const base = useBase();
  const { entity: customer } = useEntityContext<CommonCustomerFragment>();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState<CommonCustomerOrderFragment[]>([]);

  useEffect(() => {
    void (async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: '10',
        search,
        customerId: customer.id
      }).toString();

      const result = await fetch(`/api/customer/orders?${searchParams}`, {
        method: 'GET'
      });

      const { data: orders } = (await result.json()) as InternalApiResponse<
        CommonCustomerOrderFragment[]
      >;

      setOrders(orders);
    })();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>

      <CardContent>
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
            {orders.map(order => (
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

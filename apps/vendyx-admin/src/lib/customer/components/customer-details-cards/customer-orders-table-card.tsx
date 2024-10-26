import Link from 'next/link';

import { type CommonCustomerFragment } from '@/api/types';
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

  const orders = customer.orders.items;

  if (orders.length === 0) {
    return null;
  }

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

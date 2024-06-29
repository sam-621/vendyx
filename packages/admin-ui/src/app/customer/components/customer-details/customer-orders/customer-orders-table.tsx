import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { getFormattedPrice } from '@ebloc/common';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@ebloc/theme';

import { OrderStatusBadge } from '@/lib/components';
import { type CommonCustomerFragment } from '@/lib/ebloc/codegen/graphql';
import { formatDate } from '@/lib/utils';

export const CustomerOrdersTable: FC<Props> = ({ orders }) => {
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
                  <Link to={`/orders/${order.id}`} className="w-full hover:underline">
                    #{order.code}
                  </Link>
                </TableCell>
                <TableCell>{formatDate(new Date(order.placedAt as string))}</TableCell>
                <TableCell>{order.shipment?.method.name}</TableCell>
                <TableCell>{getFormattedPrice(order.total)}</TableCell>
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

type Props = {
  orders: CommonCustomerFragment['orders']['items'];
};

import { type FC } from 'react';

import Link from 'next/link';

import { type CommonCustomerOrderFragment } from '@/api/types';
import { OrderStatusBadge, TableCell, TableRow } from '@/lib/shared/components';
import { formatDate, formatPrice } from '@/lib/shared/utils';

export const CustomerOrdersTableRow: FC<Props> = ({ order, base }) => {
  return (
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
  );
};

type Props = {
  base: string;
  order: CommonCustomerOrderFragment;
};

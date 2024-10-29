import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';

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
import { PAGINATION_PAGE_SIZE, useBase, usePagination } from '@/lib/shared/hooks';
import { formatDate, formatPrice } from '@/lib/shared/utils';

import { useCustomerOrdersTable } from './use-customer-orders-table';

export const CustomerOrdersTable = () => {
  const base = useBase();
  const { page, search, handleSearch, nextPage, prevPage } = usePagination();
  const { orders, isLoading } = useCustomerOrdersTable(page, search);

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
            onClick={() => prevPage()}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <span>{page}</span>
          <Button
            type="button"
            disabled={orders.length < PAGINATION_PAGE_SIZE || isLoading}
            variant="outline"
            onClick={() => orders.length === PAGINATION_PAGE_SIZE && nextPage()}
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

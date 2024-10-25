import { type FC } from 'react';

import { OrderService } from '@/api/services';
import { type OrderState } from '@/api/types';
import {
  DataTable,
  DataTableEmptyState,
  type DataTableSearchParams,
  getSkip,
  parseDataTableSearchParams
} from '@/lib/shared/components';

import { OrdersTableColumns } from './orders-table-columns';

export const OrdersTable: FC<Props> = async props => {
  const { page, search, size } = parseDataTableSearchParams({ ...props });

  const { items: orders, pageInfo } = await OrderService.getAll({
    skip: getSkip(page, size),
    take: size,
    filters: { code: search }
  });

  if (!orders.length) {
    return <DataTableEmptyState title="Your orders will appear here" />;
  }

  const data: OrdersTableRow[] = orders.map(o => ({
    id: o.id,
    code: o.code,
    customer: o.customer?.firstName ?? o.customer?.lastName ?? 'Guest',
    placedAt: o.placedAt,
    total: o.total,
    items: o.totalQuantity,
    shipment: o.shipment?.method ?? '',
    state: o.state
  }));

  return (
    <DataTable
      columns={OrdersTableColumns}
      data={data}
      defaults={{ page, search, size }}
      totalRows={pageInfo.total}
    />
  );
};

export type OrdersTableRow = {
  id: string;
  code: string;
  /**
   * Customer name
   */
  customer: string;
  placedAt: string;
  total: number;
  /**
   * Total quantity of items in the order
   */
  items: number;
  /**
   * Shipment method
   */
  shipment: string;
  state: OrderState;
};

type Props = DataTableSearchParams;

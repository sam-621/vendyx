import { DataTable } from '@/lib/components/data-table';
import { DataTableSkeleton } from '@/lib/components/skeletons';
import { useGetOrders } from '@/app/orders/hooks';
import { type OrderState } from '@/lib/ebloc/codegen/graphql';

import { OrderTableColumns } from './order-table-columns';

export const OrderTable = () => {
  const { orders = [], isLoading } = useGetOrders();

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  const data: TableOrder[] =
    orders.map(o => {
      return {
        id: o.id,
        code: o.code,
        customer: o.customer?.firstName ?? o.customer?.lastName ?? 'Guest',
        placedAt: o.placedAt,
        total: o.total,
        items: o.totalQuantity,
        shipment: o.shipment?.method.name ?? '',
        state: o.state
      };
    }) ?? [];

  return (
    <DataTable
      data={data}
      columns={OrderTableColumns}
      search={{ filterKey: 'code', placeholder: 'Search orders...' }}
    />
  );
};

export type TableOrder = {
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

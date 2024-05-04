import { DataTable } from '@/components/data-table';
import { useGetOrders } from '@/core/orders';
import { type OrderState } from '@/lib/vendyx/codegen/graphql';

import { OrderTableColumns } from './order-table-columns';

export const OrderTable = () => {
  const { orders = [], isLoading } = useGetOrders();

  if (isLoading) {
    return <div>Loading...</div>;
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
        shipment: 'Express',
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

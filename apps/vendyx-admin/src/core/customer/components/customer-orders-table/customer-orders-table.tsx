import { ItemsTable } from '@/shared/components/items-table/items-table';
import { useBase } from '@/shared/hooks/use-base';

import { CustomerOrdersTableRow } from './customer-orders-table-row';
import { useCustomerOrdersTable } from './use-customer-orders-table';

export const CustomerOrdersTable = () => {
  const base = useBase();
  const { orders, isLoading, fetchOrders } = useCustomerOrdersTable();

  return (
    <ItemsTable
      title="Orders"
      headers={['Code', 'Date', 'Shipment', 'Total', 'Status']}
      items={orders}
      isLoading={isLoading}
      onChange={async (page, search) => await fetchOrders(page, search)}
      renderRow={order => <CustomerOrdersTableRow key={order.id} order={order} base={base} />}
    />
  );
};

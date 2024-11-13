import { ItemsTable } from '@/lib/shared/components';
import { useBase } from '@/lib/shared/hooks';

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

import { DataTable, DataTableSkeleton } from '@/lib/components';

import { useGetCustomers } from '../../hooks';
import { CustomerTableColumns } from './customer-table-columns';

export const CustomerTable = () => {
  const { customers, isLoading } = useGetCustomers();

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  const data: TableCustomer[] =
    customers?.items.map(customer => ({
      id: customer.id,
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      orders: customer.orders.count,
      totalSpent: customer.orders.items.reduce((acc, order) => acc + order.total, 0),
      enabled: customer.enabled
    })) ?? [];

  return (
    <DataTable
      columns={CustomerTableColumns}
      data={data}
      search={{ filterKey: 'name', placeholder: 'Search customers...' }}
    />
  );
};

export type TableCustomer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  enabled: boolean;
};

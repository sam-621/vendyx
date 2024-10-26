import { type FC } from 'react';

import { CustomerService } from '@/api/services';
import {
  DataTable,
  DataTableEmptyState,
  type DataTableSearchParams,
  getSkip,
  parseDataTableSearchParams
} from '@/lib/shared/components';

import { CustomersTableColumns } from './customers-table-columns';

export const CustomersTable: FC<Props> = async props => {
  const { page, search, size } = parseDataTableSearchParams({ ...props });

  const { items: customers, pageInfo } = await CustomerService.getAll({
    skip: getSkip(page, size),
    take: size,
    filters: {
      firstName: { contains: search },
      lastName: { contains: search },
      email: { contains: search }
    }
  });

  const filtersApplied = Boolean(search);

  if (!customers.length && !filtersApplied) {
    return <DataTableEmptyState title="Your customers will appear here" />;
  }

  const data: CustomersTableRow[] = customers.map(c => ({
    id: c.id,
    name: `${c.firstName} ${c.lastName}`,
    email: c.email,
    orders: c.orders.count,
    totalSpent: c.totalSpent,
    enabled: c.enabled
  }));

  return (
    <DataTable
      columns={CustomersTableColumns}
      data={data}
      defaults={{ page, search, size }}
      totalRows={pageInfo.total}
    />
  );
};

export type CustomersTableRow = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  enabled: boolean;
};

type Props = DataTableSearchParams;

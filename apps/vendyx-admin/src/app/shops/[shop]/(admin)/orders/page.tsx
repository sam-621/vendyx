import { Suspense } from 'react';

import { OrdersTable } from '@/lib/orders/orders-table';
import {
  AdminPageLayout,
  type DataTableSearchParams,
  DataTableSkeleton
} from '@/lib/shared/components';

export default function OrdersPage({ searchParams }: Props) {
  return (
    <AdminPageLayout title="Orders">
      <Suspense fallback={<DataTableSkeleton />}>
        <OrdersTable {...searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};

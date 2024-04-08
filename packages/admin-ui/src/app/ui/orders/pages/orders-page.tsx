import { PageLayout } from '@/components/layout';

import { OrderTable } from '../components/orders-table';

export const OrderPages = () => {
  return (
    <PageLayout title="Orders" subtitle="Manage orders">
      <OrderTable />
    </PageLayout>
  );
};

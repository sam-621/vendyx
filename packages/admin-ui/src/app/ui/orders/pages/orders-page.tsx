import { PageLayout } from '@/components/layout';

import { OrderTable } from '../components/orders-table';

export const OrderPages = () => {
  return (
    <PageLayout title="Ordenes" subtitle="Administra tus ordenes">
      <OrderTable />
    </PageLayout>
  );
};

import { PageLayout } from '@/lib/components';

import { CustomerTable } from '../components/customer-table/customer-table';

export const CustomersPage = () => {
  return (
    <PageLayout title="Customers" subtitle="Manage your customers">
      <CustomerTable />
    </PageLayout>
  );
};

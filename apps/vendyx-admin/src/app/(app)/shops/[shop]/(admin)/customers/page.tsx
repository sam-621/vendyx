import { CustomersTable } from '@/lib/customer/components';
import { AdminPageLayout, type DataTableSearchParams } from '@/lib/shared/components';

export default async function CustomersPage({ searchParams }: Props) {
  return (
    <AdminPageLayout title="Customers">
      <CustomersTable {...searchParams} />
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};

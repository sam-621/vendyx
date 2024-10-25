import { AdminPageLayout, DataTableEmptyState } from '@/lib/shared/components';

export default function OrdersPage() {
  return (
    <AdminPageLayout title="Orders">
      <DataTableEmptyState title="Your orders will appear here" />
    </AdminPageLayout>
  );
}

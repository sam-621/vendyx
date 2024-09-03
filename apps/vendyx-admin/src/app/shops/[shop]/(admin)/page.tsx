import Link from 'next/link';

import { AdminPageLayout, Button, DataTableEmptyState } from '@/components/shared';

export default function Home() {
  return (
    <AdminPageLayout
      title="Products"
      actions={
        <Link href="/products/new">
          <Button>Add product</Button>
        </Link>
      }
    >
      <DataTableEmptyState
        title="You have no products"
        description="You can start selling as soon as you add a product."
        action={{ label: 'Add product', to: '/product/create' }}
      />
    </AdminPageLayout>
  );
}

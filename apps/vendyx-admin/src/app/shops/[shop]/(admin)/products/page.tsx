import { Suspense } from 'react';

import Link from 'next/link';

import { ProductTable } from '@/lib/product';
import {
  AdminPageLayout,
  Button,
  type DataTableSearchParams,
  DataTableSkeleton
} from '@/lib/shared/components';

export default function ProductsPage({ searchParams }: Props) {
  return (
    <AdminPageLayout
      title="Products"
      actions={
        <Link href="products/new">
          <Button>Add product</Button>
        </Link>
      }
    >
      <Suspense fallback={<DataTableSkeleton />}>
        <ProductTable {...searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};

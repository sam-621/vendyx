import { Suspense } from 'react';

import Link from 'next/link';

import { CollectionsTable } from '@/lib/collection/components';
import {
  AdminPageLayout,
  Button,
  type DataTableSearchParams,
  DataTableSkeleton
} from '@/lib/shared/components';

export default function CollectionsPage({ searchParams }: Props) {
  return (
    <AdminPageLayout
      title="Collections"
      actions={
        <Link href="collections/new">
          <Button>Add Collection</Button>
        </Link>
      }
    >
      <Suspense fallback={<DataTableSkeleton />}>
        <CollectionsTable {...searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};

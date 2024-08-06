import Link from 'next/link';

import { AdminPageLayout, Button } from '@/lib/shared/components';

export default function Home() {
  return (
    <AdminPageLayout
      title="Products"
      actions={
        <Link href="/products/new">
          <Button>Add product</Button>
        </Link>
      }
    ></AdminPageLayout>
  );
}

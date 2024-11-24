import Link from 'next/link';

import { Button } from '@/lib/shared/components';

export const ShopsListEmptyState = () => {
  return (
    <div className="px-4 py-6 rounded-xl border border-dashed max-w-[420px] mx-auto text-center flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="h4">You have no shops yet</h1>
        <p className="muted text-muted-foreground">Create a shop to start selling your products</p>
      </div>
      <Link href="/shops/new">
        <Button>Create a shop</Button>
      </Link>
    </div>
  );
};

import { Button } from '@vendyx/theme';
import { PlusIcon } from 'lucide-react';

import { ProductTable } from '../components/product-table';

export const ProductsPage = () => {
  return (
    <div className="flex flex-col gap-8 mx-8 py-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">Inventory</h1>
            <p className="text-muted-foreground text-sm font-normal">Manage your products</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="flex gap-2">
            <PlusIcon size={16} /> New
          </Button>
        </div>
      </header>
      <main className="flex flex-col gap-8">
        <ProductTable />
      </main>
    </div>
  );
};

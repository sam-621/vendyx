import { Button } from '@vendyx/theme';
import { MoveLeftIcon, PlusIcon } from 'lucide-react';

import { ProductTable } from '../components/product-table';

export const ProductPage = () => {
  return (
    <div className="flex flex-col gap-8 w-[775px] mx-auto py-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <MoveLeftIcon />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">Add product</h1>
            <p className="text-muted-foreground text-sm font-normal">
              Create a product, add prices, content and more
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button>
            <PlusIcon /> New
          </Button>
        </div>
      </header>
      <main className="flex flex-col gap-8">
        <ProductTable />
      </main>
    </div>
  );
};

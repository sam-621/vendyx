import { Link } from 'react-router-dom';

import { Button } from '@vendyx/theme';
import { PlusIcon } from 'lucide-react';

import { PageLayout } from '@/components/layout';

import { ProductTable } from '../components/product-table';

export const ProductsPage = () => {
  return (
    <PageLayout
      title="Inventory"
      subtitle="Manage your products"
      actions={
        <Link to="/inventory/new">
          <Button className="flex gap-2">
            <PlusIcon size={16} /> New
          </Button>
        </Link>
      }
    >
      <ProductTable />
    </PageLayout>
  );
};

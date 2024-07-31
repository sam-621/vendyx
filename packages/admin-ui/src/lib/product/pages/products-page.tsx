import { Link } from 'react-router-dom';

import { Button } from '@ebloc/theme';

import { AdminPageLayout } from '@/lib/shared';

import { ProductTable } from '../components/products-table';

export const ProductsPage = () => {
  return (
    <AdminPageLayout
      title="Products"
      breadcrumbs={[{ label: 'Products' }]}
      actions={
        <Link to="/products/new">
          <Button>Add product</Button>
        </Link>
      }
    >
      <ProductTable />
    </AdminPageLayout>
  );
};

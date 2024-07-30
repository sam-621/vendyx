import { AdminPageLayout } from '@/lib/shared';

import { ProductTable } from '../components/products-table';

export const ProductsPage = () => {
  return (
    <AdminPageLayout breadcrumbs={[{ label: 'Products' }]}>
      <ProductTable />
    </AdminPageLayout>
  );
};

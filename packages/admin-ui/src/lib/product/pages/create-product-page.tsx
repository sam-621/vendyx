import { AdminPageLayout } from '@/lib/shared';

export const CreateProductPage = () => {
  return (
    <AdminPageLayout
      title="Create Product"
      breadcrumbs={[{ label: 'Products', to: '/products' }, { label: 'Create product' }]}
    ></AdminPageLayout>
  );
};

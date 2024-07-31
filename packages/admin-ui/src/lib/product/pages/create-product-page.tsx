import { AdminPageLayout, Form } from '@/lib/shared';

import { ProductDetails, useProductDetailsForm } from '../components/product-details';

export const CreateProductPage = () => {
  const form = useProductDetailsForm();

  return (
    <AdminPageLayout
      title="Create Product"
      breadcrumbs={[{ label: 'Products', to: '/products' }, { label: 'Create product' }]}
    >
      <Form {...form}>
        <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
          <ProductDetails />
        </form>
      </Form>
    </AdminPageLayout>
  );
};

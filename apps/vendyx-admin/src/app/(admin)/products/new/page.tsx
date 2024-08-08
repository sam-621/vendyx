'use client';

import { ProductDetails, ProductSubmitButton, useProductDetailsForm } from '@/lib/product';
import { AdminPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

export default function CreateProductPage() {
  const form = useProductDetailsForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <AdminPageLayout
          title="Create Product"
          maxWidth
          actions={<ProductSubmitButton isLoading={form.isLoading} />}
        >
          <ProductDetails />
        </AdminPageLayout>
      </form>
    </Form>
  );
}

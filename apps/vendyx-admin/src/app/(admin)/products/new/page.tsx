'use client';

import { ProductDetails, useProductDetailsForm } from '@/lib/product';
import { AdminPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

export default function CreateProductPage() {
  const form = useProductDetailsForm();

  return (
    <AdminPageLayout title="Create Product" maxWidth>
      <Form {...form}>
        <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
          <ProductDetails />
        </form>
      </Form>
    </AdminPageLayout>
  );
}

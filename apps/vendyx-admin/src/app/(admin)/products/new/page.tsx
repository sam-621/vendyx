'use client';

import { ProductDetails, useProductDetailsForm } from '@/lib/product';
import { AdminPageLayout, Button } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

export default function CreateProductPage() {
  const form = useProductDetailsForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <AdminPageLayout
          title="Create Product"
          maxWidth
          actions={<Button type="submit">Save</Button>}
        >
          <ProductDetails />
        </AdminPageLayout>
      </form>
    </Form>
  );
}

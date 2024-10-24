'use client';

import { type FC } from 'react';

import { type CommonProductFragment } from '@/api';
import { AdminPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

import { ProductSubmitButton } from '../product-submit-button';
import { ProductDetails } from './product-details';
import { useProductDetailsForm } from './use-product-details-form';

export const ProductDetailsForm: FC<Props> = ({ product }) => {
  const form = useProductDetailsForm(product);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <AdminPageLayout
          title={product ? product.name : 'Create product'}
          maxWidth
          actions={<ProductSubmitButton isLoading={form.isLoading} product={product} />}
        >
          <ProductDetails product={product} />
        </AdminPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  product?: CommonProductFragment;
};

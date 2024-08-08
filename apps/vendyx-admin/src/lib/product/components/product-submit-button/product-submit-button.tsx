'use client';

import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/lib/shared/components';

import { type ProductDetailsFormInput } from '../product-details/use-product-details-form';

export const ProductSubmitButton: FC<Props> = ({ isLoading }) => {
  const form = useFormContext<ProductDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const withValues = Boolean(values.name?.length);

  return (
    <Button isLoading={isLoading} disabled={!withValues || isLoading} type="submit">
      Save
    </Button>
  );
};

type Props = {
  isLoading: boolean;
};

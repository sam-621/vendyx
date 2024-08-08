import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/lib/shared/components';

import { type ProductDetailsFormInput } from '../product-details';

export const ProductSubmitButton: FC<Props> = ({ isLoading }) => {
  const form = useFormContext<ProductDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const withValues = Boolean(values.name?.length);

  return (
    <Button disabled={!withValues || isLoading} type="submit">
      Save
    </Button>
  );
};

type Props = {
  isLoading: boolean;
};

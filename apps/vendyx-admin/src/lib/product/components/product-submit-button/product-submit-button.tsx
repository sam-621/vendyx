import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/lib/shared/components';

import { type ProductDetailsFormInput } from '../product-details';

export const ProductSubmitButton = () => {
  const form = useFormContext<ProductDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const withValues = Boolean(values.name?.length);

  return (
    <Button disabled={!withValues} type="submit">
      Save
    </Button>
  );
};

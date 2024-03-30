import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';

import { FormInput } from '@/components/forms';
import { type ProductDetailsFragmentFragment } from '@/lib/vendyx/codegen/graphql';

import { type ProductDetailsFormInput } from '../use-product-details-form';

export const VariantDetails: FC<Props> = ({ variants }) => {
  const defaultVariant = variants?.items[0];
  const { register, formState } = useFormContext<ProductDetailsFormInput>();
  const { errors } = formState;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Variants</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FormInput
            {...register('price')}
            error={errors.price?.message}
            defaultValue={defaultVariant?.price}
            type="number"
            label="Price"
            placeholder="$ 0.00"
          />
          <FormInput
            {...register('sku')}
            error={errors.sku?.message}
            defaultValue={defaultVariant?.sku}
            label="SKU"
            placeholder="SKU - 000"
          />
          <FormInput
            {...register('quantity')}
            error={errors.quantity?.message}
            defaultValue={defaultVariant?.stock}
            type="number"
            label="Quantity"
            placeholder="0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  variants?: ProductDetailsFragmentFragment['variants'];
};

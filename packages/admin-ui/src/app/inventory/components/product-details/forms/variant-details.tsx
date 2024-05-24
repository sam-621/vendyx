import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { convertToDollar } from '@vendyx/common';
import { Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';

import { FormInput } from '@/app/components/forms';
import { t } from '@/lib/locales';
import { type ProductDetailsFragmentFragment } from '@/lib/vendyx/codegen/graphql';

import { type ProductDetailsFormInput } from '../use-product-details-form';

export const VariantDetails: FC<Props> = ({ variants }) => {
  const defaultVariant = variants?.items[0];
  const { register, formState } = useFormContext<ProductDetailsFormInput>();
  const { errors } = formState;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>{t('product-details.pricing.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FormInput
            {...register('price')}
            error={errors.price?.message}
            defaultValue={convertToDollar(defaultVariant?.price ?? 0)}
            type="number"
            label={t('product-details.pricing.input.price')}
            placeholder="$ 0.00"
          />
          <FormInput
            {...register('sku')}
            error={errors.sku?.message}
            defaultValue={defaultVariant?.sku}
            label={t('product-details.pricing.title')}
            placeholder="SKU - 000"
          />
          <FormInput
            {...register('quantity')}
            error={errors.quantity?.message}
            defaultValue={defaultVariant?.stock}
            type="number"
            label={t('product-details.pricing.input.quantity')}
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

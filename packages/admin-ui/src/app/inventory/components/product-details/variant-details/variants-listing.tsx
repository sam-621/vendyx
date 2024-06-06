import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { getFormattedPrice } from '@vendyx/common';

import { FormInput } from '@/app/components';
import { t } from '@/lib/locales';
import { type CommonProductFragment } from '@/lib/vendyx/codegen/graphql';

import { type ProductDetailsFormInput } from '../use-product-details-form';
import { VariantItem } from './variant-item';

export const VariantsListing: FC<Props> = ({ variants }) => {
  const hasOptions = variants?.items.some(variant => Boolean(variant.optionValues?.length));

  if (!hasOptions) {
    return <DefaultVariant variant={variants?.items[0]} />;
  }

  return <>{variants?.items.map(variant => <VariantItem key={variant.id} variant={variant} />)}</>;
};

const DefaultVariant: FC<DefaultVariantProps> = ({ variant }) => {
  const { register, formState } = useFormContext<ProductDetailsFormInput>();
  const { errors } = formState;

  return (
    <div className="flex gap-4">
      <FormInput
        {...register('price')}
        error={errors.price?.message}
        defaultValue={getFormattedPrice(variant?.price ?? 0).replace('$', '')}
        type="text"
        label={t('product-details.pricing.input.price')}
        placeholder="$ 0.00"
      />
      <FormInput
        {...register('sku')}
        error={errors.sku?.message}
        defaultValue={variant?.sku}
        label={t('product-details.pricing.title')}
        placeholder="SKU - 000"
      />
      <FormInput
        {...register('quantity')}
        error={errors.quantity?.message}
        defaultValue={variant?.stock}
        type="number"
        label={t('product-details.pricing.input.quantity')}
        placeholder="0"
      />
    </div>
  );
};

type Props = {
  variants: CommonProductFragment['variants'] | undefined | null;
};

type DefaultVariantProps = {
  variant: CommonProductFragment['variants']['items'][0] | undefined | null;
};

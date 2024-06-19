import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { getFormattedPrice } from '@ebloc/common';

import { FormInput } from '@/app/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { t } from '@/lib/locales';

import { type ProductDetailsFormInput } from '../use-product-details-form';
import { VariantItem } from './variant-item';

export const VariantsListing: FC<Props> = ({ variants }) => {
  const hasNoOptions = variants?.items.some(variant => variant.optionValues?.length === 0);

  if ([0, 1].includes(variants?.items.length ?? 0) && hasNoOptions) {
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

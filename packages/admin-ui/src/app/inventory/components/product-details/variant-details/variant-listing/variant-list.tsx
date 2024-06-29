import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { getFormattedPrice } from '@ebloc/common';

import { useProductDetailsContext } from '@/app/inventory/context';
import { getVariantsGroupedByOption } from '@/app/inventory/utils';
import { FormInput } from '@/lib/components';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { t } from '@/lib/locales';

import { type ProductDetailsFormInput } from '../../use-product-details-form';
import { VariantGroup } from './variant-group';
import { VariantItem } from './variant-item';

export const VariantList: FC<Props> = ({ variants }) => {
  const { product } = useProductDetailsContext();

  if (!variants?.items.length) {
    return <DefaultVariant variant={null} />;
  }

  if (variants?.items.length === 1 && variants?.items[0].optionValues?.length === 0) {
    return <DefaultVariant variant={variants?.items[0]} />;
  }

  if (product?.options.length === 1) {
    return variants?.items.map(variant => <VariantItem key={variant.id} variant={variant} />);
  }

  const groupBy = product?.options[0];
  const variantsGrouped = getVariantsGroupedByOption(groupBy!, variants?.items);

  return Object.entries(variantsGrouped).map(([optionValueId, variants]) => (
    <VariantGroup key={optionValueId} optionValue={optionValueId} variants={variants} />
  ));
};

const DefaultVariant: FC<DefaultVariantProps> = ({ variant }) => {
  const { register, formState } = useFormContext<ProductDetailsFormInput>();
  const { errors } = formState;

  return (
    <div className="flex gap-4 px-6">
      <FormInput
        {...register('price')}
        error={errors.price?.message}
        defaultValue={getFormattedPrice(variant?.price ?? 0).replace('$', '')}
        type="text"
        label={t('product-details.pricing.input.price')}
        placeholder="$ 0.00"
        onFocus={e => e.target.select()}
      />
      <FormInput
        {...register('sku')}
        error={errors.sku?.message}
        defaultValue={variant?.sku}
        label="SKU"
        placeholder="SKU - 000"
      />
      <FormInput
        {...register('quantity')}
        error={errors.quantity?.message}
        defaultValue={variant?.stock}
        type="number"
        label="Stock"
        placeholder="0"
        onFocus={e => e.target.select()}
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

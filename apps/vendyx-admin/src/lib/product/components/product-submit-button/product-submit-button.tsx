'use client';

import { type FC } from 'react';
import { type DeepPartial, useFormContext, useWatch } from 'react-hook-form';

import { type CommonProductFragment } from '@/api/types';
import { Button } from '@/lib/shared/components';
import { clean, formatPrice } from '@/lib/shared/utils';

import { type ProductDetailsFormInput } from '../product-details/use-product-details-form';

export const ProductSubmitButton: FC<Props> = ({ isLoading, product }) => {
  const form = useFormContext<ProductDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const hasChanged = product ? valuesHasChanged(values, product) : true; // is creating a new product;
  const withRequiredValues = Boolean(values.name?.length);

  return (
    <Button
      isLoading={isLoading}
      disabled={!withRequiredValues || isLoading || !hasChanged}
      type="submit"
    >
      Save
    </Button>
  );
};

export const valuesHasChanged = (
  values: DeepPartial<ProductDetailsFormInput>,
  defaultValues: CommonProductFragment
) => {
  const _product = clean(defaultValues);
  const defaultVariant = _product.variants.items[0];

  const defaultForm: ProductDetailsFormInput = {
    name: _product.name,
    description: _product.description,
    price: defaultVariant.salePrice ? formatPrice(defaultVariant.salePrice) : '',
    comparisonPrice: defaultVariant.comparisonPrice
      ? formatPrice(defaultVariant.comparisonPrice)
      : '',
    revenue: '',
    margin: '',
    costPerUnit: defaultVariant.costPerUnit ? formatPrice(defaultVariant.costPerUnit) : '',
    stock: _product.variants.items[0]?.stock,
    sku: _product.variants.items[0]?.sku,
    requiresShipping: _product.variants.items[0]?.requiresShipping,
    enabled: _product.enabled,
    options: _product.options,
    variants: _product.variants.items
  };
  const { variants, options, ..._values } = values;
  const { variants: defaultVariants, options: defaultOptions, ..._defaultValues } = defaultForm;

  const formValuesHasChanged = Object.keys(_values).some(
    key => (_values as any)[key] !== (_defaultValues as any)[key]
  );

  const optionsHasChanged = getOptionsHasChanged(options, defaultOptions);
  const variantsHasChanged = getVariantsHasChanged(variants, defaultVariants);

  return formValuesHasChanged || optionsHasChanged || variantsHasChanged;
};

const getVariantsHasChanged = (
  variants: DeepPartial<ProductDetailsFormInput['variants']> | undefined,
  defaultVariants: ProductDetailsFormInput['variants']
) => {
  return variants?.some(v => {
    if (!v) return false;

    const persistedVariant = defaultVariants.find(dv => dv.id === v?.id);
    const { salePrice, stock } = v;

    const inMemoryVariant = { salePrice: (salePrice ?? 0) * 100, stock };

    return (
      inMemoryVariant.salePrice !== persistedVariant?.salePrice ||
      inMemoryVariant.stock !== persistedVariant?.stock
    );
  });
};

const getOptionsHasChanged = (
  options: DeepPartial<ProductDetailsFormInput['options']> | undefined,
  defaultOptions: ProductDetailsFormInput['options']
) => {
  if (options?.length !== defaultOptions.length) return true;

  return options?.some(o => {
    const persistedOption = defaultOptions.find(dv => dv.id === o?.id);
    const nameIsDifferent = o?.name !== persistedOption?.name;

    const valueContentIsDifferent = o?.values
      ?.filter(v => v?.name)
      .some(v => {
        const persistedValue = persistedOption?.values.find(pv => pv.id === v?.id);
        return v?.name !== persistedValue?.name;
      });

    return nameIsDifferent || valueContentIsDifferent;
  });
};

type Props = {
  isLoading: boolean;
  product?: CommonProductFragment;
};

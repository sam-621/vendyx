'use client';

import { type FC } from 'react';
import { type DeepPartial, useFormContext, useWatch } from 'react-hook-form';

import { type VariantProps } from 'class-variance-authority';

import { type CommonProductFragment } from '@/api/types';
import { Button, type buttonVariants } from '@/lib/shared/components';
import { clean, formatPrice } from '@/lib/shared/utils';

import { type ProductDetailsFormInput } from '../product-details/use-product-details-form';

export const ProductSubmitButton: FC<Props> = ({ product, size = 'default' }) => {
  const form = useFormContext<ProductDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isLoading = (form as any).isLoading as boolean; // This exists in every form, i just need to add it to the type but i'm lazy
  const hasChanged = product ? valuesHasChanged(values, product) : true; // is creating a new product;
  const withRequiredValues = Boolean(values.name?.length);

  // console.log({
  //   values,
  //   isLoading,
  //   hasChanged,
  //   withRequiredValues
  // });

  return (
    <Button
      isLoading={isLoading}
      disabled={!withRequiredValues || isLoading || !hasChanged}
      type="submit"
      size={size}
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
    stock: _product.variants.items[0]?.stock,
    sku: _product.variants.items[0]?.sku ?? '',
    requiresShipping: _product.variants.items[0]?.requiresShipping,
    enabled: _product.enabled,
    options: _product.options,
    variants: _product.variants.items
  };
  const { variants, options, ..._values } = values;
  const { variants: defaultVariants, options: defaultOptions, ..._defaultValues } = defaultForm;

  // console.log({
  //   _values,
  //   _defaultValues,
  //   options,
  //   defaultOptions,
  //   variants,
  //   defaultVariants
  // });

  const formValuesHasChanged = Object.keys(_values).some(
    key => (_values as any)[key] !== (_defaultValues as any)[key]
  );

  const optionsHasChanged = getOptionsHasChanged(options, defaultOptions);
  const variantsHasChanged = getVariantsHasChanged(variants, defaultVariants);

  console.log({
    optionsHasChanged,
    variantsHasChanged,
    formValuesHasChanged
  });

  return formValuesHasChanged || optionsHasChanged || variantsHasChanged;
};

const getVariantsHasChanged = (
  variants: DeepPartial<ProductDetailsFormInput['variants']> | undefined,
  defaultVariants: ProductDetailsFormInput['variants']
) => {
  console.log({
    variants,
    defaultVariants
  });

  return variants?.some(v => {
    if (!v) return false;

    const persistedVariant = defaultVariants.find(dv => dv.id === v?.id);
    const { salePrice, stock, comparisonPrice, requiresShipping, sku } = v;

    const inMemoryVariant = {
      salePrice,
      stock,
      comparisonPrice,
      sku: sku ?? null,
      requiresShipping
    };

    console.log({
      inMemoryVariant,
      persistedVariant
    });

    console.log({
      '1': inMemoryVariant.salePrice !== persistedVariant?.salePrice,
      '2': inMemoryVariant.stock !== persistedVariant?.stock,
      '3': inMemoryVariant.comparisonPrice !== persistedVariant?.comparisonPrice,
      '4': inMemoryVariant.requiresShipping !== persistedVariant?.requiresShipping,
      '5': inMemoryVariant.sku !== persistedVariant?.sku
    });

    return (
      inMemoryVariant.salePrice !== persistedVariant?.salePrice ||
      inMemoryVariant.stock !== persistedVariant?.stock ||
      inMemoryVariant.comparisonPrice !== persistedVariant?.comparisonPrice ||
      inMemoryVariant.requiresShipping !== persistedVariant?.requiresShipping ||
      inMemoryVariant.sku !== persistedVariant?.sku
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
  product?: CommonProductFragment;
  size?: VariantProps<typeof buttonVariants>['size'];
};

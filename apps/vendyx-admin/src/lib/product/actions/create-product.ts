'use server';

import { redirect } from 'next/navigation';

import { optionService, productService, variantService } from '@/lib/shared/api';

export const createProduct = async (input: CreateProductInput) => {
  if (!input.variants.length) {
    throw new Error('createProduct: At least one variant is required');
  }

  const product = await productService.create({
    name: input.name,
    description: input.description,
    enabled: input.enabled
  });

  if (!input.options?.length) {
    await createVariants(product.id, input.variants);
    redirect(`${product.id}`);
  }

  const options = await createOptions(product.id, input.options);

  const newVariants = attachOptionValues(options, input.variants);
  await createVariants(product.id, newVariants);

  redirect(`${product.id}`);
};

const attachOptionValues = (
  options: CreateProductInput['options'],
  variants: CreateProductInput['variants']
) => {
  return variants.map(variant => {
    const variantOptionValues = variant.optionValues ?? [];

    const valuesIds = options
      .map(option => {
        const value = option.values.find(value =>
          variantOptionValues.map(variantValue => variantValue.name).includes(value.name)
        );

        return value?.id ?? '';
      })
      .filter(Boolean);

    return {
      ...variant,
      optionValues: valuesIds.map(id => ({ id, name: '' }))
    };
  });
};

const createVariants = async (productId: string, variants: CreateProductInput['variants']) => {
  for (const variant of variants) {
    await variantService.create(productId, {
      salePrice: variant.salePrice,
      comparisonPrice: variant.comparisonPrice,
      costPerUnit: variant.costPerUnit,
      stock: variant.stock,
      sku: variant.sku,
      requiresShipping: variant.requiresShipping,
      optionValues: variant.optionValues?.map(value => value.id)
    });
  }
};

const createOptions = async (productId: string, input: CreateProductInput['options']) => {
  if (!input?.length) return [];

  const options = [];
  let order = 0;

  for (const option of input) {
    const result = await optionService.create(productId, {
      order,
      name: option.name,
      values: option.values.map((value, i) => ({ name: value.name, order: i }))
    });

    options.push(result);
    order++;
  }

  return options;
};

type CreateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
  options: {
    id: string;
    name: string;
    values: { id: string; name: string }[];
  }[];
  variants: {
    salePrice: number;
    comparisonPrice?: number;
    costPerUnit?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
    optionValues?: { id: string; name: string }[];
  }[];
};

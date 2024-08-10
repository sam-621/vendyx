'use server';

import { redirect } from 'next/navigation';

import { optionService, productService, variantService } from '@/lib/shared/api';

export const saveProduct = async (input: SaveProductInput) => {
  const { variants } = input;

  if (!variants.length) {
    throw new Error('createProduct: At least one variant is required');
  }

  const isCreating = !input.productId;

  if (isCreating) {
    await onCreate(input);
  } else {
    throw new Error('updateProduct: Not implemented');
    await onUpdate(input);
  }
};

const onCreate = async (input: SaveProductInput) => {
  const product = await createProduct(input);

  if (!input.options?.length) {
    await createVariants(product.id, input.variants);
    redirect(`${product.id}`);
  }

  const options = await createOptions(product.id, input.options);

  const newVariants = input.variants.map(variant => {
    const variantOptionValues = variant.optionValues ?? [];

    const valuesIds = options
      .map(option => {
        const value = option.values.find(value => variantOptionValues.includes(value.name));

        return value?.id ?? '';
      })
      .filter(Boolean);

    return {
      ...variant,
      optionValues: valuesIds
    };
  });

  await createVariants(product.id, newVariants);

  redirect(`${product.id}`);
};

const onUpdate = async (input: SaveProductInput) => {
  if (!input.productId) {
    throw new Error('updateProduct: productId is required for update');
  }

  await updateProduct(input.productId, input);
  await updateVariants(input.variants);
};

const createProduct = async (input: SaveProductInput) => {
  const product = await productService.create({
    name: input.name,
    description: input.description,
    enabled: input.enabled
  });

  return product;
};

const updateProduct = async (productId: string, input: SaveProductInput) => {
  await productService.update(productId, {
    name: input.name,
    description: input.description,
    enabled: input.enabled
  });
};

const createVariants = async (productId: string, variants: SaveProductInput['variants']) => {
  for (const variant of variants) {
    await variantService.create(productId, {
      salePrice: variant.salePrice,
      comparisonPrice: variant.comparisonPrice,
      costPerUnit: variant.costPerUnit,
      stock: variant.stock,
      sku: variant.sku,
      requiresShipping: variant.requiresShipping,
      optionValues: variant.optionValues
    });
  }
};

const updateVariants = async (variants: SaveProductInput['variants']) => {
  for (const variant of variants) {
    if (!variant.id) {
      continue; // Skip iteration
    }

    await variantService.update(variant.id, {
      salePrice: variant.salePrice,
      comparisonPrice: variant.comparisonPrice,
      costPerUnit: variant.costPerUnit,
      stock: variant.stock,
      sku: variant.sku,
      requiresShipping: variant.requiresShipping
    });
  }
};

const createOptions = async (productId: string, input: SaveProductInput['options']) => {
  if (!input?.length) return [];

  const options = [];

  for (const option of input) {
    const result = await optionService.create(productId, {
      name: option.name,
      values: option.values
    });

    options.push(result);
  }

  return options;
};

type SaveProductInput = {
  productId?: string;
  name: string;
  description?: string;
  enabled?: boolean;
  options?: {
    name: string;
    values: string[];
  }[];
  variants: {
    id?: string;
    salePrice: number;
    comparisonPrice?: number;
    costPerUnit?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
    optionValues?: string[];
  }[];
};

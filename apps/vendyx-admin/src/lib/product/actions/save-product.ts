'use server';

import { redirect } from 'next/navigation';

import { productService, variantService } from '@/lib/shared/api';

export const saveProduct = async (input: SaveProductInput) => {
  const { variants } = input;

  if (!variants.length) {
    throw new Error('createProduct: At least one variant is required');
  }

  const isCreating = !input.productId;

  if (isCreating) {
    await onCreate(input);
  } else {
    await onUpdate(input);
  }
};

const onCreate = async (input: SaveProductInput) => {
  const { variants } = input;

  const product = await createProduct(input);
  await createVariants(product.id, variants);

  redirect(`/products/${product.id}`);
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
    await variantService.create(productId, variant);
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

type SaveProductInput = {
  productId?: string;
  name: string;
  description?: string;
  enabled?: boolean;
  variants: {
    id?: string;
    salePrice: number;
    comparisonPrice?: number;
    costPerUnit?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
  }[];
};

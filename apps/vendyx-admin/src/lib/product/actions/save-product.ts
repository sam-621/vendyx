'use server';

import { redirect } from 'next/navigation';

import { productService, variantService } from '@/lib/shared/api';

export const saveProduct = async (input: SaveProductInput) => {
  const { variants } = input;

  if (!variants.length) {
    throw new Error('createProduct: At least one variant is required');
  }

  const product = await createProduct(input);
  await createVariants(product.id, variants);

  redirect(`/products/${product.id}`);
};

const createProduct = async (input: SaveProductInput) => {
  const product = await productService.create({
    name: input.name,
    description: input.description,
    enabled: input.enabled
  });

  return product;
};

const createVariants = async (productId: string, variants: SaveProductInput['variants']) => {
  for (const variant of variants) {
    await variantService.create(productId, variant);
  }
};

type SaveProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
  variants: {
    salePrice: number;
    comparisonPrice?: number;
    costPerUnit?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
  }[];
};

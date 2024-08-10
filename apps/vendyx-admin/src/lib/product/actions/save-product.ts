'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { optionService, productService, variantService } from '@/lib/shared/api';
import { isUUID } from '@/lib/shared/utils';

// YA obtengo las variantes y opciones con sus ids,
// en options estos ids son o randoms o uuids (puedo usar el mutation updateOption y mando los values como: si es un random no mando el id y si es uuid, sí lo mando)
// Antes de crear las variantes, debo asociarlas con los nuevos ids de las opciones (replicar onCreate)
// en variants estos ids son o randoms o uuids (si es random, creo, si es uuid, actualizo)
export const saveProduct = async (input: SaveProductInput) => {
  const { variants } = input;

  if (!variants.length) {
    throw new Error('createProduct: At least one variant is required');
  }

  const isCreating = !input.productId;

  if (isCreating) {
    await onCreate(input);
  } else {
    console.log({ input });
    // return '';

    // throw new Error('updateProduct: Not implemented');
    await onUpdate(input);
    revalidatePath(`/shops/alfertex/products/${input.productId}`);
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

  await createVariants(product.id, newVariants);

  redirect(`${product.id}`);
};

const onUpdate = async (input: SaveProductInput) => {
  if (!input.productId) {
    throw new Error('updateProduct: productId is required for update');
  }

  const optionsToCreate = input.options?.filter(o => !isUUID(o.id));
  const optionsToUpdate = input.options?.filter(o => isUUID(o.id));

  console.log({
    optionsToCreate,
    optionsToUpdate,
    optionsToRemove: input.optionsToRemove
  });

  const optionsUpdated = [];

  if (optionsToUpdate?.length) {
    for (const option of optionsToUpdate) {
      const updatedOption = await optionService.update(option.id, {
        name: option.name,
        values: option.values.map(value => ({
          id: isUUID(value.id) ? value.id : '',
          name: value.name
        }))
      });

      optionsUpdated.push(updatedOption);
    }
  }

  const options = await createOptions(input.productId, optionsToCreate);

  await Promise.all(
    input.optionsToRemove.map(async optionId => await optionService.remove(optionId))
  );

  const newOptions = [...optionsUpdated, ...options];

  const newVariants = input.variants.map(variant => {
    const variantOptionValues = variant.optionValues ?? [];

    const valuesIds = newOptions
      .map(option => {
        const value = option.values.find(value =>
          variantOptionValues.map(variantValue => variantValue.name).includes(value.name)
        );

        return value;
      })
      .filter(Boolean);

    return {
      ...variant,
      optionValues: valuesIds.map(id => ({ id: id?.id ?? '', name: id?.name ?? '' }))
    };
  });

  console.log({
    newOptions,
    newVariants
  });

  const variantsToUpdate = newVariants.filter(variant => isUUID(variant.id ?? ''));
  const variantsToCreate = newVariants.filter(variant => !isUUID(variant.id ?? ''));

  console.log({
    variantsToUpdate,
    variantsToCreate
  });

  await updateProduct(input.productId, input);
  await updateVariants(variantsToUpdate);
  await createVariants(input.productId, variantsToCreate);
  await Promise.all(
    input.variantsToRemove.map(async variantId => await variantService.remove(variantId))
  );
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
      optionValues: variant.optionValues?.map(value => value.id)
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
      requiresShipping: variant.requiresShipping,
      optionValues: variant.optionValues?.map(value => value.id)
    });
  }
};

const createOptions = async (productId: string, input: SaveProductInput['options']) => {
  if (!input?.length) return [];

  const options = [];

  for (const option of input) {
    const result = await optionService.create(productId, {
      name: option.name,
      values: option.values.map(value => value.name)
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
    id: string;
    name: string;
    values: { id: string; name: string }[];
  }[];
  variants: {
    id?: string;
    salePrice: number;
    comparisonPrice?: number;
    costPerUnit?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
    optionValues?: { id: string; name: string }[];
  }[];
  variantsToRemove: string[];
  optionsToRemove: string[];
};

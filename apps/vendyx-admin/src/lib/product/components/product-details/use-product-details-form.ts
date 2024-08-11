import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonProductFragment } from '@/lib/shared/api';
import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';
import { formatPrice, parsePrice } from '@/lib/shared/utils';

import { createProduct } from '../../actions';
import { updateProduct } from '../../actions/update-product';

export const useProductDetailsForm = (product?: CommonProductFragment) => {
  const [isLoading, startTransition] = useTransition();

  const defaultVariant = product?.variants.items[0];

  const form = useForm<ProductDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: defaultVariant?.salePrice ? formatPrice(defaultVariant.salePrice) : '',
      comparisonPrice: defaultVariant?.comparisonPrice
        ? formatPrice(defaultVariant.comparisonPrice)
        : '',
      costPerUnit: defaultVariant?.costPerUnit ? formatPrice(defaultVariant.costPerUnit) : '',
      stock: defaultVariant?.stock ?? 0,
      sku: defaultVariant?.sku ?? '',
      requiresShipping: defaultVariant?.requiresShipping ?? false,
      enabled: product?.enabled ?? true,
      variants:
        product?.variants.items.map(variant => ({
          id: variant.id,
          salePrice: variant.salePrice,
          comparisonPrice: variant.comparisonPrice,
          costPerUnit: variant.costPerUnit,
          stock: variant.stock,
          sku: variant.sku,
          requiresShipping: variant.requiresShipping,
          optionValues: variant.optionValues
        })) ?? [],
      options:
        product?.options.map(option => ({
          id: option.id,
          name: option.name,
          values: option.values.map(value => ({
            id: value.id,
            name: value.name
          }))
        })) ?? []
    }
  });

  async function onSubmit(values: ProductDetailsFormInput) {
    const { variants, options } = values;

    startTransition(async () => {
      if (product?.id) {
        // Update product
        await updateProduct(product.id, {
          name: values.name,
          description: values.description,
          enabled: values.enabled,
          options,
          variants: variants.length
            ? variants
            : [
                {
                  id: defaultVariant?.id ?? '',
                  salePrice: values.price ? parsePrice(values.price) : 0,
                  comparisonPrice: values.comparisonPrice ? parsePrice(values.comparisonPrice) : 0,
                  costPerUnit: values.costPerUnit ? parsePrice(values.costPerUnit) : 0,
                  stock: values.stock,
                  sku: values.sku,
                  requiresShipping: values.requiresShipping
                }
              ],
          variantsToRemove:
            product?.variants.items
              .filter(variant => !variants.some(v => v.id === variant.id))
              .filter(variant => variant.id !== defaultVariant?.id) // Don't remove the default variant
              .map(variant => variant.id) ?? [],
          optionsToRemove:
            product?.options
              .filter(option => !options.some(o => o.id === option.id))
              .map(option => option.id) ?? []
        });

        notification.success('Product saved');
      } else {
        await createProduct({
          name: values.name,
          description: values.description,
          enabled: values.enabled,
          options,
          variants: variants.length
            ? variants
            : [
                {
                  salePrice: values.price ? parsePrice(values.price) : 0,
                  comparisonPrice: values.comparisonPrice ? parsePrice(values.comparisonPrice) : 0,
                  costPerUnit: values.costPerUnit ? parsePrice(values.costPerUnit) : 0,
                  stock: values.stock,
                  sku: values.sku,
                  requiresShipping: values.requiresShipping
                }
              ]
        });
      }
    });
  }

  return {
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    ...form
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  price: z.string().optional(),
  comparisonPrice: z.string().optional(),
  costPerUnit: z.string().optional(),
  stock: z.preprocess(val => Number(val ?? 0), z.number().int().min(0).default(0)),
  sku: z.string().optional(),
  requiresShipping: z.boolean(),
  enabled: z.boolean().default(true),
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      values: z.array(
        z.object({
          id: z.string(),
          name: z.string()
        })
      )
    })
  ),
  variants: z.array(
    z.object({
      id: z.string(),
      salePrice: z.number().int().min(0),
      stock: z.number().int().optional(),
      optionValues: z.array(
        z.object({
          id: z.string(),
          name: z.string()
        })
      )
    })
  )
});

export type ProductDetailsFormInput = z.infer<typeof schema>;

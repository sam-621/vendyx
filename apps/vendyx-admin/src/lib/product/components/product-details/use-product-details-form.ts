import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';
import { parsePrice } from '@/lib/shared/utils';

import { saveProduct } from '../../actions';

export const useProductDetailsForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<ProductDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      comparisonPrice: '',
      costPerUnit: '',
      stock: 0,
      sku: '',
      requiresShipping: false,
      enabled: true
    }
  });

  async function onSubmit(values: ProductDetailsFormInput) {
    startTransition(async () => {
      await saveProduct({
        name: values.name,
        description: values.description,
        enabled: values.enabled,
        variants: [
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

      notification.success('Product saved');
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
  enabled: z.boolean().default(true)
});

export type ProductDetailsFormInput = z.infer<typeof schema>;

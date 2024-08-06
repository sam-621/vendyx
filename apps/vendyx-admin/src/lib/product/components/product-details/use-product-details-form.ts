import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';

export const useProductDetailsForm = () => {
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
    console.log(values);
  }

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  price: z.string().optional(),
  comparisonPrice: z.string().optional(),
  costPerUnit: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  sku: z.string().optional(),
  requiresShipping: z.boolean(),
  enabled: z.boolean().default(true)
});

export type ProductDetailsFormInput = z.infer<typeof schema>;

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages, type MakeAny } from '@/core/common';
import { useForm } from '@/lib/form';

export const useProductDetailsForm = () => {
  const methods = useForm<ProductDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (input: ProductDetailsFormInput) => {
    console.log(input);
  };

  return {
    onSubmit: methods.handleSubmit(onSubmit),
    ...methods
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.maxChars(3)),
  slug: z.string().min(3, FormMessages.maxChars(3)),
  description: z.string().optional(),
  assets: z.any(),
  price: z.preprocess(value => Number(value ?? 0), z.number().min(0).optional()),
  quantity: z.preprocess(value => Number(value ?? 0), z.number().min(0).optional()),
  sku: z.string().min(3, FormMessages.minChars(3)),
  published: z.boolean(),
  onlineOnly: z.boolean()
} satisfies MakeAny<ProductDetailsFormInput>);

export type ProductDetailsFormInput = {
  name: string;
  slug: string;
  description: string;
  assets: File[];
  price: number;
  sku: string;
  quantity: number;
  published: boolean;
  onlineOnly: boolean;
};

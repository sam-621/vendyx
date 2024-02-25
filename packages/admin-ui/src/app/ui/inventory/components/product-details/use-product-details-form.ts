import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages, type MakeAny } from '@/core/common';
import { useForm } from '@/lib/form';

export const useProductDetailsForm = () => {
  const { register, handleSubmit, errors, isSubmitting, control } =
    useForm<ProductDetailsFormInput>({
      resolver: zodResolver(schema)
    });

  const onSubmit = async (input: ProductDetailsFormInput) => {
    console.log(input);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isSubmitting,
    control
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.maxChars(3)),
  slug: z.string().min(3, FormMessages.maxChars(3)),
  description: z.string().optional()
} satisfies MakeAny<ProductDetailsFormInput>);

export type ProductDetailsFormInput = {
  name: string;
  slug: string;
  description: string;
};

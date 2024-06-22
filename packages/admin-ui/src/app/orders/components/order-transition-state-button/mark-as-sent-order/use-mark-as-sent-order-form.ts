import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages, useForm } from '@/lib/form';

export const useMarkAsSentOrderForm = () => {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (input: FormInput) => {
    console.log(input);
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  carrier: z.string().min(1, { message: FormMessages.required }),
  trackingCode: z.string().min(1, { message: FormMessages.required })
} satisfies MakeAny<FormInput>);

export type FormInput = {
  carrier: string;
  trackingCode: string;
};

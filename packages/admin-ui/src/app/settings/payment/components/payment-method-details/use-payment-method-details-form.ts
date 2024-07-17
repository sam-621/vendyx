import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages, useForm } from '@/lib/form';

export const usePaymentMethodDetailsForm = () => {
  const form = useForm<PaymentMethodDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (input: PaymentMethodDetailsFormInput) => {
    console.log(input);
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.minChars(3)),
  description: z.string().optional(),
  handler: z.string(),
  enabled: z.boolean()
} satisfies MakeAny<PaymentMethodDetailsFormInput>);

export type PaymentMethodDetailsFormInput = {
  name: string;
  description: string;
  handler: string;
  enabled: boolean;
};

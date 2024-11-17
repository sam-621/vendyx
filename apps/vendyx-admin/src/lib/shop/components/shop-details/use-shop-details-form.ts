import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';

export const useShopDetailsForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      shopApiKey: '1234-5678-9012-3456'
    }
  });

  async function onSubmit(values: FormInput) {
    startTransition(async () => {
      console.log(values);
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  shopApiKey: z.string().readonly()
});

type FormInput = z.infer<typeof schema>;

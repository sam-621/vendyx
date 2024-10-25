import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';

export const useMarkAsShippedForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      carrier: '',
      trackingCode: ''
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
  carrier: z.string().min(1, FormMessages.required),
  trackingCode: z.string().min(1, FormMessages.required)
});

type FormInput = z.infer<typeof schema>;

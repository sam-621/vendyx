import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';

import { createShop } from '../../actions/create-shop';

export const useCreateShopForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = (values: FormInput) => {
    startTransition(async () => {
      await createShop(values);
    });
  };

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required)
});

type FormInput = z.infer<typeof schema>;

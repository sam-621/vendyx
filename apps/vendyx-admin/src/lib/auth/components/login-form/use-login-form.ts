import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';

import { login } from '../../actions';

export const useLoginForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: FormInput) {
    const { email, password } = values;

    startTransition(async () => {
      const error = await login(email, password);

      if (error) {
        notification.error(error);
      }
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  email: z.string().min(1, FormMessages.required),
  password: z.string().min(1, FormMessages.required)
});

type FormInput = z.infer<typeof schema>;

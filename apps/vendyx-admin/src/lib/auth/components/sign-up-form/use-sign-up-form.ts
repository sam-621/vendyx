import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';

import { signup } from '../../actions';

export const useSignUpForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      store: '',
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: FormInput) {
    startTransition(async () => {
      const { error, field } = await signup(values);

      if (error) {
        if (field === 'email') {
          form.setError(field, { message: error });
          return;
        }

        notification.error(error);
      }
    });
  }

  return {
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  store: z.string().min(1, FormMessages.required),
  email: z.string().min(1, FormMessages.required),
  password: z.string().min(1, FormMessages.required)
});

type FormInput = z.infer<typeof schema>;

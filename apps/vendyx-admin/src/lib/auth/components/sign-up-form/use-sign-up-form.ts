import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signup } from '@/lib/auth/actions/signup';
import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';

export const useSignUpForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: FormInput) {
    startTransition(async () => {
      const result = await signup(values);

      if (result.error) {
        if (result.field === 'email') {
          form.setError(result.field, { message: result.error });
          return;
        }

        notification.error(result.error);
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
  email: z.string().min(1, FormMessages.required),
  password: z.string().min(6, FormMessages.required)
});

type FormInput = z.infer<typeof schema>;

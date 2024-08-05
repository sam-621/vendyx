import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared/form';

export const useLoginForm = () => {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: FormInput) {
    const { email, password } = values;

    console.log({ email, password });
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  email: z.string().min(1, FormMessages.required),
  password: z.string().min(1, FormMessages.required)
});

type FormInput = z.infer<typeof schema>;

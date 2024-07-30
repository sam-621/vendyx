import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/lib/shared';

export const useLoginForm = () => {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  function onSubmit(values: FormInput) {
    console.log(values);
  }

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  username: z.string().min(3, FormMessages.min(3)),
  password: z.string().min(6, FormMessages.min(6))
});

type FormInput = z.infer<typeof schema>;

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuthenticate } from '@/core/admin';
import { FormMessages } from '@/core/common';
import { useForm } from '@/lib/form';

export const useLoginForm = () => {
  const { authenticate } = useAuthenticate();
  const { register, handleSubmit, errors, isSubmitting } = useForm<FromInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (input: FromInput) => {
    await authenticate(input);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isSubmitting
  };
};

const schema = z.object({
  username: z.string().min(1, FormMessages.required),
  password: z.string().min(1, FormMessages.required)
});

type FromInput = {
  username: string;
  password: string;
};

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  cookies,
  CookiesExpiry,
  CookiesKeys,
  FormMessages,
  notification,
  queryClient
} from '@/lib/shared';

import { AuthKeys, useAuthenticate } from '../../hooks';

export const useLoginForm = () => {
  const { authenticate } = useAuthenticate();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  async function onSubmit(values: FormInput) {
    const { password, username } = values;

    const { error, authToken } = await authenticate({ password, username });

    if (error) {
      notification.error(error);
      return;
    }

    cookies.set(CookiesKeys.TOKEN, authToken, { expires: CookiesExpiry.WEEK });

    // this will trigger the useValidateToken hook to refetch,
    // updating the isAuthenticated and redirecting the user to the dashboard
    await queryClient.invalidateQueries({ queryKey: AuthKeys.validate });
  }

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  username: z.string().min(1, FormMessages.required),
  password: z.string().min(1, FormMessages.required)
});

type FormInput = z.infer<typeof schema>;

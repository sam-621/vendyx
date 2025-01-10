import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ShopErrorCode } from '@/api/types';
import { FormMessages } from '@/shared/form/form-messages';
import { notification } from '@/shared/notifications/notifications';

import { createShop } from '../../actions/create-shop';

export const useCreateShopForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: ''
    }
  });

  const onSubmit = (values: FormInput) => {
    startTransition(async () => {
      const result = await createShop(values);

      if (result.error) {
        if (result.errorCode === ShopErrorCode.EmailAlreadyExists) {
          form.setError('email', { message: result.error });
          return;
        }

        notification.error(result.error);
      }
    });
  };

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  email: z.string().email(FormMessages.invalidEmail),
  phoneNumber: z.string().min(1, FormMessages.invalidPhoneNumber)
});

type FormInput = z.infer<typeof schema>;

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonOrderFragment } from '@/api/types';
import { useEntityContext } from '@/shared/contexts/entity-context';
import { FormMessages } from '@/shared/form/form-messages';
import { notification } from '@/shared/notifications/notifications';

import { markOrderAsShipped } from '../../actions/mark-order-as-delivered';

export const useMarkOrderAsShippedForm = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const { entity: order } = useEntityContext<CommonOrderFragment>();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      carrier: '',
      trackingCode: ''
    }
  });

  useEffect(() => {
    // When the form is submitted successfully, the modal closes
    // So we put the notification in the cleanup function validating if operation is successful to show notification
    return () => {
      if (isSuccess) {
        notification.success(`Order ${order.code} has been marked as sent`);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isLoading]);

  async function onSubmit(values: FormInput) {
    startTransition(async () => {
      const result = await markOrderAsShipped(order.id, values);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
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

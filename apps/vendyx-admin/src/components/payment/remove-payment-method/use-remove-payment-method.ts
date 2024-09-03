import { useTransition } from 'react';

import { removePaymentMethod } from '@/actions/payment/remove-payment-method';
import { notification } from '@/lib/notifications';

export const useRemovePaymentMethod = () => {
  const [isLoading, startTransition] = useTransition();

  const exec = async (id: string) => {
    startTransition(async () => {
      await removePaymentMethod(id);

      notification.success('Payment method removed');
    });
  };

  return {
    isLoading,
    removePaymentMethod: exec
  };
};

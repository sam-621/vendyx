import { useTransition } from 'react';

import { notification } from '@/shared/notifications/notifications';

import { removePaymentMethod } from '../../actions/remove-payment-method';

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

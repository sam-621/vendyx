import { useTransition } from 'react';

import { notification } from '@/lib/shared/notifications';

import { removePaymentMethod } from '../../actions';

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

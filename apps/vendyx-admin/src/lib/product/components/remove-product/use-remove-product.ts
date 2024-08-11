import { useTransition } from 'react';

import { notification } from '@/lib/shared/notifications';

import { removeProducts } from '../../actions';

export const useRemoveProduct = () => {
  const [isLoading, startTransition] = useTransition();

  const removeProduct = async (id: string) => {
    startTransition(async () => {
      const result = await removeProducts(id);

      if (result?.error) {
        notification.error(result.error);
      }
    });
  };

  return {
    isLoading,
    removeProduct
  };
};

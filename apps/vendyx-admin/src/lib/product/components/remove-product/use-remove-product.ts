import { useTransition } from 'react';

import { notification } from '@/lib/shared/notifications';

import { removeProduct } from '../../actions/remove-product';

export const useRemoveProduct = () => {
  const [isLoading, startTransition] = useTransition();

  const exec = async (id: string) => {
    startTransition(async () => {
      const result = await removeProduct(id);

      if (result?.error) {
        notification.error(result.error);
      }
    });
  };

  return {
    isLoading,
    removeProduct: exec
  };
};

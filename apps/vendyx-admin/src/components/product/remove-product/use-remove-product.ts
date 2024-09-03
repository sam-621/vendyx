import { useTransition } from 'react';

import { removeProduct } from '@/actions/product/remove-product';
import { notification } from '@/lib/notifications';

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

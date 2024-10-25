import { useEffect, useState, useTransition } from 'react';

import { type CommonOrderFragment } from '@/api/types';
import { useDropdownMenuContext } from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';
import { notification } from '@/lib/shared/notifications';

import { cancelOrder } from '../../actions/cancel-order';

export const useCancelOrder = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const { entity: order } = useEntityContext<CommonOrderFragment>();
  const { setIsOpen } = useDropdownMenuContext();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Order has been cancelled');
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess]);

  const exec = () => {
    startTransition(async () => {
      const result = await cancelOrder(order.id);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    cancelOrder: exec
  };
};

import { useEffect, useState, useTransition } from 'react';

import { type CommonOrderFragment } from '@/api/types';
import { useEntityContext } from '@/lib/shared/contexts';
import { notification } from '@/lib/shared/notifications';

import { markOrderAsDelivered } from '../../actions/mark-order-as-shipped';

export const useMarkOrderAsDelivered = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const { entity: order } = useEntityContext<CommonOrderFragment>();

  useEffect(() => {
    // When is success, the button unmount
    // So we put the notification in the cleanup function validating if operation is successful to show notification
    return () => {
      if (isSuccess) {
        notification.success('Order marked as completed');
      }
    };
  }, [isSuccess, isLoading]);

  const exec = () => {
    startTransition(async () => {
      const result = await markOrderAsDelivered(order.id);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
    });
  };

  return {
    markOrderAsDelivered: exec,
    isLoading
  };
};

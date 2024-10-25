import { useEffect, useState, useTransition } from 'react';

import { type ID } from '@/api/scalars';
import { useEntityContext } from '@/lib/shared/contexts';
import { notification } from '@/lib/shared/notifications';

import { removeShippingMethod } from '../../actions/remove-shipping-method';
import { type ShipmentContext } from '../../contexts';

export const useRemoveShippingMethod = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    entity: { zone }
  } = useEntityContext<ShipmentContext>();

  useEffect(() => {
    // If the shipping method is removed, the component where this hook is used will not be rendered anymore
    // So we put the notification in the cleanup function validating id before is destroyed the operation is successful
    return () => {
      if (isSuccess) {
        notification.success('Shipping method has been removed');
      }
    };
  }, [isSuccess, isLoading]);

  const exec = (methodId: ID) => {
    startTransition(async () => {
      await removeShippingMethod(methodId, zone.id);
      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    removeShippingMethod: exec
  };
};

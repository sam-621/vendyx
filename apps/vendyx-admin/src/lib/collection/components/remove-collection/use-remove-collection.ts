import { useEffect, useState, useTransition } from 'react';

import { type ID } from '@/api/scalars';
import { notification } from '@/lib/shared/notifications';

import { removeCollection } from '../../actions/remove-collection';

export const useRemoveCollection = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // When is success, the button unmounts
    // So we put the notification in the cleanup function validating if operation is successful to show notification
    return () => {
      if (isSuccess) {
        notification.success('Collection removed');
      }
    };
  }, [isSuccess, isLoading]);

  const exec = async (id: ID) => {
    startTransition(async () => {
      await removeCollection(id);
      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    removeCollection: exec
  };
};

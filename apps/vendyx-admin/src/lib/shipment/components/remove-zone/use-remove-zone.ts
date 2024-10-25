import { useTransition } from 'react';

import { type ID } from '@/api/scalars';
import { notification } from '@/lib/shared/notifications';

import { removeZone } from '../../actions/remove-zone';

export const useRemoveZone = () => {
  const [isLoading, startTransition] = useTransition();

  const exec = (zoneId: ID) => {
    startTransition(async () => {
      await removeZone(zoneId);
      notification.success('Zone removed successfully');
    });
  };

  return {
    isLoading,
    removeZone: exec
  };
};

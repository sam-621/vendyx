'use client';

import { Button } from '@/lib/shared/components';

import { useMarkOrderAsDelivered } from './use-mark-order-as-delivered';

export const MarkOrderAsDeliveredButton = () => {
  const { isLoading, markOrderAsDelivered } = useMarkOrderAsDelivered();

  return (
    <Button onClick={markOrderAsDelivered} isLoading={isLoading} type="button">
      Complete order
    </Button>
  );
};

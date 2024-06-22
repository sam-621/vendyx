import { OrderKeys, useMarkOrderAsDelivered } from '@/app/orders/hooks';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const useMarkOrderAsDeliveredForm = () => {
  const { markOrderAsDelivered, isLoading } = useMarkOrderAsDelivered();

  const onSubmit = async (id: string) => {
    const { errorMessage } = await markOrderAsDelivered(id);

    if (errorMessage) {
      notification.error(errorMessage);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: OrderKeys.single(id) });
    notification.success('Order has been completed');
  };

  return {
    onSubmit,
    isLoading
  };
};

import { getOrderErrorMessages } from '@/lib/ebloc/errors';
import { MarkOrderAsDeliveredMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useMarkOrderAsDelivered = () => {
  const { mutateAsync, isPending } = useGqlMutation(MarkOrderAsDeliveredMutation);

  const markOrderAsDelivered = async (id: string) => {
    const {
      markOrderAsDelivered: { apiErrors, order }
    } = await mutateAsync({ id });

    const errorMessage = getOrderErrorMessages(apiErrors[0]);

    return { order, errorMessage };
  };

  return {
    markOrderAsDelivered,
    isLoading: isPending
  };
};

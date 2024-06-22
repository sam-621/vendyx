import { type MarkOrderAsShippedInput } from '@/lib/ebloc/codegen/graphql';
import { getOrderErrorMessages } from '@/lib/ebloc/errors';
import { MarkOrderAsShippedMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useMarkOrderAsShipped = () => {
  const { mutateAsync, isPending } = useGqlMutation(MarkOrderAsShippedMutation);

  const markOrderAsShipped = async (id: string, input: MarkOrderAsShippedInput) => {
    const {
      markOrderAsShipped: { apiErrors, order }
    } = await mutateAsync({ id, input });

    const errorMessage = getOrderErrorMessages(apiErrors[0]);

    return { order, errorMessage };
  };

  return {
    markOrderAsShipped,
    isLoading: isPending
  };
};

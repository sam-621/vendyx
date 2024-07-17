import { getPaymentMethodErrorMessage } from '@/lib/ebloc/errors';
import { RemovePaymentMethodMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemovePaymentMethod = () => {
  const { mutateAsync } = useGqlMutation(RemovePaymentMethodMutation);

  const removePaymentMethod = async (id: string) => {
    const {
      removePaymentMethod: { apiErrors, success }
    } = await mutateAsync({ id });

    const error = getPaymentMethodErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { success };
  };

  return {
    removePaymentMethod
  };
};

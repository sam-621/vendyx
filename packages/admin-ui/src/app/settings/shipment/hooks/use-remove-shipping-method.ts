import { getShippingMethodErrorMessage } from '@/lib/ebloc/errors';
import { RemoveShippingMethodMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveShippingMethod = () => {
  const { mutateAsync } = useGqlMutation(RemoveShippingMethodMutation);

  const removeShippingMethod = async (id: string) => {
    const {
      removeShippingMethod: { apiErrors, success }
    } = await mutateAsync({ id });

    const error = getShippingMethodErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { success };
  };

  return {
    removeShippingMethod
  };
};

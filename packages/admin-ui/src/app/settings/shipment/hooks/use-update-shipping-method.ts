import { type UpdateShippingMethodInput } from '@/lib/ebloc/codegen/graphql';
import { getShippingMethodErrorMessage } from '@/lib/ebloc/errors';
import { UpdateShippingMethodMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateShippingMethod = () => {
  const { mutateAsync } = useGqlMutation(UpdateShippingMethodMutation);

  const updateShippingMethod = async (id: string, input: UpdateShippingMethodInput) => {
    const {
      updateShippingMethod: { apiErrors, shippingMethod }
    } = await mutateAsync({ id, input });

    const error = getShippingMethodErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { shippingMethod };
  };

  return {
    updateShippingMethod
  };
};

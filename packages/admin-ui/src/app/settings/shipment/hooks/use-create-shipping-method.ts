import { type CreateShippingMethodInput } from '@/lib/ebloc/codegen/graphql';
import { getShippingMethodErrorMessage } from '@/lib/ebloc/errors';
import { CreateShippingMethodMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useCreateShippingMethod = () => {
  const { mutateAsync } = useGqlMutation(CreateShippingMethodMutation);

  const createShippingMethod = async (zoneId: string, input: CreateShippingMethodInput) => {
    const {
      createShippingMethod: { apiErrors, shippingMethod }
    } = await mutateAsync({ zoneId, input });

    const error = getShippingMethodErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { shippingMethod };
  };

  return {
    createShippingMethod
  };
};

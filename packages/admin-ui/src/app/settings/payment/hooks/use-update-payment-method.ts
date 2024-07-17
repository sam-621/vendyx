import { type UpdatePaymentMethodInput } from '@/lib/ebloc/codegen/graphql';
import { getPaymentMethodErrorMessage } from '@/lib/ebloc/errors';
import { UpdatePaymentMethodMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdatePaymentMethod = () => {
  const { mutateAsync } = useGqlMutation(UpdatePaymentMethodMutation);

  const updatePaymentMethod = async (id: string, input: UpdatePaymentMethodInput) => {
    const {
      updatePaymentMethod: { apiErrors, paymentMethod }
    } = await mutateAsync({ id, input });

    const error = getPaymentMethodErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { paymentMethod };
  };

  return {
    updatePaymentMethod
  };
};

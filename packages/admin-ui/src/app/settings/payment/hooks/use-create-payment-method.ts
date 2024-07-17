import { type CreatePaymentMethodInput } from '@/lib/ebloc/codegen/graphql';
import { getPaymentMethodErrorMessage } from '@/lib/ebloc/errors';
import { CreatePaymentMethodMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useCreatePaymentMethod = () => {
  const { mutateAsync } = useGqlMutation(CreatePaymentMethodMutation);

  const createPaymentMethod = async (input: CreatePaymentMethodInput) => {
    const {
      createPaymentMethod: { apiErrors, paymentMethod }
    } = await mutateAsync({ input });

    const error = getPaymentMethodErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { paymentMethod };
  };

  return {
    createPaymentMethod
  };
};

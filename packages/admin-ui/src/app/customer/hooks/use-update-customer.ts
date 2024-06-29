import { type UpdateCustomerInput } from '@/lib/ebloc/codegen/graphql';
import { getCustomerErrorMessage } from '@/lib/ebloc/errors';
import { UpdateCustomerMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateCustomer = () => {
  const { mutateAsync, isPending } = useGqlMutation(UpdateCustomerMutation);

  const updateCustomer = async (id: string, input: UpdateCustomerInput) => {
    const {
      updateCustomer: { apiErrors }
    } = await mutateAsync({ id, input });

    const errorMessage = getCustomerErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return {
        error: true,
        message: errorMessage,
        errorCode: apiErrors[0].code
      };
    }

    return {
      error: false
    };
  };

  return {
    updateCustomer,
    isLoading: isPending
  };
};

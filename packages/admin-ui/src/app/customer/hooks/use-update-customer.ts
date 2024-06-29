import { type UpdateCustomerInput } from '@/lib/ebloc/codegen/graphql';
import { getCustomerErrorMessage } from '@/lib/ebloc/errors';
import { UpdateCustomerMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateCustomer = () => {
  const { mutateAsync, isPending } = useGqlMutation(UpdateCustomerMutation);

  const updateCustomer = async (id: string, input: UpdateCustomerInput) => {
    const {
      updateCustomer: { apiErrors, customer }
    } = await mutateAsync({ id, input });

    const errorMessage = getCustomerErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return errorMessage;
    }

    return customer?.id;
  };

  return {
    updateCustomer,
    isLoading: isPending
  };
};

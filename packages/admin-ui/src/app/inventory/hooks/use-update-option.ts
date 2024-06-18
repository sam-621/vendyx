import { type UpdateOptionInput } from '@/lib/ebloc/codegen/graphql';
import { getOptionErrorMessages } from '@/lib/ebloc/errors';
import { UpdateOptionMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateOption = () => {
  const { mutateAsync, isPending } = useGqlMutation(UpdateOptionMutation);

  const updateOption = async (id: string, input: UpdateOptionInput) => {
    const {
      updateOption: { apiErrors }
    } = await mutateAsync({ id, input });

    const errorMessage = getOptionErrorMessages(apiErrors[0]);

    return {
      success: Boolean(errorMessage),
      error: errorMessage
    };
  };

  return {
    updateOption,
    isLoading: isPending
  };
};

import { type UpdateOptionValueInput } from '@/lib/ebloc/codegen/graphql';
import { UpdateOptionValuesMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateOptionValues = () => {
  const { mutateAsync, isPending } = useGqlMutation(UpdateOptionValuesMutation);

  const updateOptionValues = async (input: UpdateOptionValueInput[]) => {
    const {
      updateOptionValues: { option }
    } = await mutateAsync({ input });

    return {
      option
    };
  };

  return {
    updateOptionValues,
    isLoading: isPending
  };
};

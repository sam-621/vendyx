import { RemoveOptionMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveOption = () => {
  const { mutateAsync, isPending } = useGqlMutation(RemoveOptionMutation);

  const removeOption = async (id: string) => {
    const {
      removeOption: { success }
    } = await mutateAsync({ id });

    return {
      success
    };
  };

  return {
    removeOption,
    isLoading: isPending
  };
};

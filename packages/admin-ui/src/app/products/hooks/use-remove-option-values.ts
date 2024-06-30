import { RemoveOptionValuesMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveOptionValues = () => {
  const { mutateAsync, isPending } = useGqlMutation(RemoveOptionValuesMutation);

  const removeOptionValues = async (ids: string[]) => {
    const {
      removeOptionValues: { option }
    } = await mutateAsync({ ids });

    return {
      option
    };
  };

  return {
    removeOptionValues,
    isLoading: isPending
  };
};

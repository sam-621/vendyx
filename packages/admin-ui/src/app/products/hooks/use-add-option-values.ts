import { AddOptionValuesMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useAddOptionValues = () => {
  const { mutateAsync, isPending } = useGqlMutation(AddOptionValuesMutation);

  const addOptionValues = async (optionId: string, values: string[]) => {
    const {
      addOptionValues: { option }
    } = await mutateAsync({ optionId, values });

    return {
      values: option?.values
    };
  };

  return {
    addOptionValues,
    isLoading: isPending
  };
};

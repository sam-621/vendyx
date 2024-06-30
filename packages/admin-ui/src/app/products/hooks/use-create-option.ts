import { type CreateOptionInput } from '@/lib/ebloc/codegen/graphql';
import { getOptionErrorMessages } from '@/lib/ebloc/errors/option.errors';
import { CreateOptionMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useCreateOption = () => {
  const { mutateAsync, isPending } = useGqlMutation(CreateOptionMutation);

  const createOption = async (input: CreateOptionInput) => {
    const {
      createOption: { apiErrors, option }
    } = await mutateAsync({ createOptionInput: input });

    const errorMessage = getOptionErrorMessages(apiErrors[0]);

    return {
      option,
      error: errorMessage
    };
  };

  return {
    createOption,
    isLoading: isPending
  };
};

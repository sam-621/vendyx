import { useGqlMutation } from '@/lib/gql';
import { type CreateOptionInput } from '@/lib/vendyx/codegen/graphql';
import { getOptionErrorMessages } from '@/lib/vendyx/errors/option.errors';
import { CreateOptionMutation } from '@/lib/vendyx/mutations';

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

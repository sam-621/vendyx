import { useGqlMutation } from '@/lib/gql';
import { type CreateOptionInput } from '@/lib/vendyx/codegen/graphql';
import { CreateOptionMutation } from '@/lib/vendyx/mutations';

export const useCreateOption = () => {
  const { mutateAsync, isPending } = useGqlMutation(CreateOptionMutation);

  const createOption = async (input: CreateOptionInput) => {
    const { createOption: options } = await mutateAsync({ createOptionInput: input });

    return options;
  };

  return {
    createOption,
    isLoading: isPending
  };
};

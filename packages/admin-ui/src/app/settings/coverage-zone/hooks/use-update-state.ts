import { type UpdateStateInput } from '@/lib/ebloc/codegen/graphql';
import { getStateErrorMessage } from '@/lib/ebloc/errors';
import { UpdateStateMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateState = () => {
  const { mutateAsync } = useGqlMutation(UpdateStateMutation);

  const updateState = async (id: string, input: UpdateStateInput) => {
    const {
      updateState: { apiErrors, state }
    } = await mutateAsync({ id, input });

    const errorMessage = getStateErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return errorMessage;
    }

    return state;
  };

  return {
    updateState
  };
};

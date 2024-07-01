import { type UpdateCollectionInput } from '@/lib/ebloc/codegen/graphql';
import { getCollectionErrorMessage } from '@/lib/ebloc/errors';
import { UpdateCollectionMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateCollection = () => {
  const { mutateAsync } = useGqlMutation(UpdateCollectionMutation);

  const updateCollection = async (id: string, input: UpdateCollectionInput) => {
    const {
      updateCollection: { apiErrors }
    } = await mutateAsync({ id, input });

    const errorMessage = getCollectionErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return { errorMessage };
    }

    return { success: true };
  };

  return {
    updateCollection
  };
};

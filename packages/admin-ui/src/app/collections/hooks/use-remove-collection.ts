import { getCollectionErrorMessage } from '@/lib/ebloc/errors';
import { RemoveCollectionMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveCollection = () => {
  const { mutateAsync } = useGqlMutation(RemoveCollectionMutation);

  const removeCollection = async (id: string) => {
    const {
      removeCollection: { apiErrors }
    } = await mutateAsync({ id });

    const errorMessage = getCollectionErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return { errorMessage };
    }

    return { success: true };
  };

  return {
    removeCollection
  };
};

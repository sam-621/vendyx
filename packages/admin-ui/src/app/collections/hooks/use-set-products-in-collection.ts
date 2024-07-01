import { getCollectionErrorMessage } from '@/lib/ebloc/errors';
import { SetProductsInCollectionMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useSetProductsInCollection = () => {
  const { mutateAsync } = useGqlMutation(SetProductsInCollectionMutation);

  const setProductsInCollection = async (id: string, productIds: string[]) => {
    const {
      setProductsInCollection: { apiErrors }
    } = await mutateAsync({ id, productIds });

    const errorMessage = getCollectionErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return { errorMessage };
    }

    return { success: true };
  };

  return {
    setProductsInCollection
  };
};

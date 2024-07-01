import { SetProductsInCollectionMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useSetProductsInCollection = () => {
  const { mutateAsync } = useGqlMutation(SetProductsInCollectionMutation);

  const setProductsInCollection = async (id: string, productIds: string[]) => {
    const {
      setProductsInCollection: { apiErrors }
    } = await mutateAsync({ id, productIds });

    if (apiErrors) {
      return { errorMessage: apiErrors[0].message };
    }

    return { success: true };
  };

  return {
    setProductsInCollection
  };
};

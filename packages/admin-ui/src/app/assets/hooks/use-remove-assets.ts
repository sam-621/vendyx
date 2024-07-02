import { RemoveAssetsMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveAssets = () => {
  const { mutateAsync } = useGqlMutation(RemoveAssetsMutation);

  const removeAssets = async (ids: string[]) => {
    const {
      removeAssets: { success }
    } = await mutateAsync({ ids });

    return success;
  };

  return {
    removeAssets
  };
};

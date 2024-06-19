import { RemoveVariantMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveVariant = () => {
  const { mutateAsync } = useGqlMutation(RemoveVariantMutation);

  const removeVariant = async (id: string) => {
    const {
      removeVariant: { success }
    } = await mutateAsync({ removeVariantId: id });

    return success;
  };

  return {
    removeVariant
  };
};

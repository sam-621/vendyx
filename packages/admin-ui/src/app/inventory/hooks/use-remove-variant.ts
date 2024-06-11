import { useGqlMutation } from '@/lib/gql';
import { useLoading } from '@/lib/hooks';
import { RemoveVariantMutation } from '@/lib/ebloc/mutations';

export const useRemoveVariant = () => {
  const { mutateAsync } = useGqlMutation(RemoveVariantMutation);
  const { isLoading } = useLoading();

  const removeVariant = async (id: string) => {
    const {
      removeVariant: { success }
    } = await mutateAsync({ removeVariantId: id });

    return success;
  };

  return {
    removeVariant,
    isLoading
  };
};

import { useGqlMutation } from '@/lib/gql';
import { type UpdateVariantInput } from '@/lib/vendyx/codegen/graphql';
import { UpdateVariantMutation } from '@/lib/vendyx/mutations';

export const useUpdateVariant = () => {
  const { mutateAsync, isPending } = useGqlMutation(UpdateVariantMutation);

  const updateVariant = async (variantId: string, input: UpdateVariantInput) => {
    await mutateAsync({ updateVariantId: variantId, updateVariantInput: input });
  };

  return {
    updateVariant,
    isLoading: isPending
  };
};

import { type UpdateVariantInput } from '@/lib/ebloc/codegen/graphql';
import { UpdateVariantMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateVariant = () => {
  const { mutateAsync, isPending } = useGqlMutation(UpdateVariantMutation);

  const updateVariant = async (variantId: string, input: UpdateVariantInput) => {
    const {
      updateVariant: { variant }
    } = await mutateAsync({ updateVariantId: variantId, updateVariantInput: input });

    return variant;
  };

  return {
    updateVariant,
    isLoading: isPending
  };
};

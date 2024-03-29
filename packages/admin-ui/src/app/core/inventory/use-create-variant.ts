import { useGqlMutation } from '@/lib/gql';
import { type CreateVariantInput } from '@/lib/vendyx/codegen/graphql';
import { CreateVariantMutation } from '@/lib/vendyx/mutations';

export const useCreateVariant = () => {
  const { mutateAsync, isPending } = useGqlMutation(CreateVariantMutation);

  const createVariant = async (productId: string, input: CreateVariantInput) => {
    const {
      createVariant: { id }
    } = await mutateAsync({ createVariantProductId: productId, createVariantInput: input });

    return id;
  };

  return {
    createVariant,
    isLoading: isPending
  };
};

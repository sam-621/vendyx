import { useGqlMutation } from '@/lib/gql';
import { notification } from '@/lib/notifications';
import { type CreateVariantInput } from '@/lib/vendyx/codegen/graphql';
import { CreateVariantMutation } from '@/lib/vendyx/mutations';

export const useCreateVariant = () => {
  const { mutateAsync, isPending } = useGqlMutation(CreateVariantMutation);

  const createVariant = async (productId: string, input: CreateVariantInput) => {
    const {
      createVariant: { apiErrors, variant }
    } = await mutateAsync({ createVariantProductId: productId, createVariantInput: input });

    if (apiErrors.length) {
      notification.error('Error creating variant');
      return null;
    }

    return variant?.id;
  };

  return {
    createVariant,
    isLoading: isPending
  };
};

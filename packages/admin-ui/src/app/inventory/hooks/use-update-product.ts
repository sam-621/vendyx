import { useGqlMutation } from '@/lib/gql';
import { useLoading } from '@/lib/hooks';
import { notification } from '@/lib/notifications';
import { type UpdateProductInput } from '@/lib/ebloc/codegen/graphql';
import { getProductErrorMessages } from '@/lib/ebloc/errors';
import { UpdateProductMutation } from '@/lib/ebloc/mutations';

export const useUpdateProduct = () => {
  const { mutateAsync } = useGqlMutation(UpdateProductMutation);
  const { isLoading } = useLoading();

  const updateProduct = async (productId: string, input: UpdateProductInput) => {
    const {
      updateProduct: { apiErrors, product }
    } = await mutateAsync({ productId, input });

    const errorMessage = getProductErrorMessages(apiErrors[0]);

    if (errorMessage) {
      notification.error(errorMessage);
      return;
    }

    return product?.id;
  };

  return {
    updateProduct,
    isLoading
  };
};

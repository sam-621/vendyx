import { useGqlMutation } from '@/lib/gql';
import { notification } from '@/lib/notifications';
import { getProductErrorMessages } from '@/lib/vendyx/errors';
import { RemoveProductMutation } from '@/lib/vendyx/mutations';

export const useRemoveProduct = () => {
  const { mutateAsync, isPending } = useGqlMutation(RemoveProductMutation);

  const removeProduct = async (productId: string) => {
    const {
      removeProduct: { apiErrors }
    } = await mutateAsync({ productId });

    const errorMessage = getProductErrorMessages(apiErrors[0]);

    if (errorMessage) {
      notification.error(errorMessage);
    }
  };

  return {
    removeProduct,
    isLoading: isPending
  };
};

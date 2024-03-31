import { useGqlMutation } from '@/lib/gql';
import { RemoveProductMutation } from '@/lib/vendyx/mutations';

export const useRemoveProduct = () => {
  const { mutateAsync, isPending } = useGqlMutation(RemoveProductMutation);

  const removeProduct = async (productId: string) => {
    await mutateAsync({ productId });
  };

  return {
    removeProduct,
    isLoading: isPending
  };
};

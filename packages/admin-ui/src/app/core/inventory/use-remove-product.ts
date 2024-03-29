import { useGqlMutation } from '@/lib/gql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';
import { RemoveProductMutation } from '@/lib/vendyx/mutations';

import { InventoryKeys } from './inventory.keys';

export const useRemoveProduct = () => {
  const { mutateAsync, isPending } = useGqlMutation(RemoveProductMutation);

  const removeProduct = async (productId: string) => {
    notification.loading('Removing product...');
    await mutateAsync({ productId });
    await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });
    notification.success('Product removed successfully');
  };

  return {
    removeProduct,
    isLoading: isPending
  };
};

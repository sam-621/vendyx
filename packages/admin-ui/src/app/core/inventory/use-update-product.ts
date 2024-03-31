import { useGqlMutation } from '@/lib/gql';
import { queryClient } from '@/lib/query-client';
import { type UpdateProductInput } from '@/lib/vendyx/codegen/graphql';
import { UpdateProductMutation } from '@/lib/vendyx/mutations';

import { useLoading } from '../common';
import { InventoryKeys } from './inventory.keys';

export const useUpdateProduct = () => {
  const { mutateAsync } = useGqlMutation(UpdateProductMutation);
  const { isLoading, setIsLoading } = useLoading();

  const updateProduct = async (productId: string, input: UpdateProductInput) => {
    setIsLoading(true);
    const {
      updateProduct: { id }
    } = await mutateAsync({ productId, input });

    await queryClient.invalidateQueries({ queryKey: InventoryKeys.single(id) });

    setIsLoading(false);
  };

  return {
    updateProduct,
    isLoading
  };
};

import { useGqlMutation } from '@/lib/gql';
import { queryClient } from '@/lib/query-client';
import { type UpdateVariantInput } from '@/lib/vendyx/codegen/graphql';
import { UpdateVariantMutation } from '@/lib/vendyx/mutations';

import { useLoading } from '../common';
import { InventoryKeys } from './inventory.keys';

export const useUpdateVariant = () => {
  const { mutateAsync } = useGqlMutation(UpdateVariantMutation);
  const { isLoading, setIsLoading } = useLoading();

  const updateVariant = async (variantId: string, input: UpdateVariantInput) => {
    setIsLoading(true);
    await mutateAsync({ updateVariantId: variantId, updateVariantInput: input });
    await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });
    setIsLoading(false);
  };

  return {
    updateVariant,
    isLoading
  };
};

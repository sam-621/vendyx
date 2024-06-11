import { useGqlQuery } from '@/lib/gql';
import { useFragment } from '@/lib/ebloc/codegen';
import { CommonProductFragment, GetProductDetailsQuery } from '@/lib/ebloc/queries';

import { InventoryKeys } from './inventory.keys';

export const useGetProductDetails = (slug: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetProductDetailsQuery,
    variables: { slug },
    key: InventoryKeys.single(slug)
  });
  const product = useFragment(CommonProductFragment, data?.product);

  return {
    product,
    isLoading
  };
};

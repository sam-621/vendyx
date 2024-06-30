import { useFragment } from '@/lib/ebloc/codegen';
import { CommonProductFragment, GetProductDetailsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { ProductKeys } from './product.keys';

export const useGetProductDetails = (slug: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetProductDetailsQuery,
    variables: { slug },
    key: ProductKeys.single(slug)
  });
  const product = useFragment(CommonProductFragment, data?.product);

  return {
    product,
    isLoading
  };
};

import { CommonProductFragment, GetProductDetailsQuery, useGqlQuery } from '@/lib/shared';
import { useFragment } from '@/lib/shared/ebloc/codegen';

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

import { useGqlQuery } from '@/lib/gql';
import { useFragment } from '@/lib/vendyx/codegen';
import { GetProductDetailsQuery, ProductDetailsFragment } from '@/lib/vendyx/queries';

export const useGetProductDetails = (slug: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetProductDetailsQuery,
    variables: { slug }
  });
  const product = useFragment(ProductDetailsFragment, data?.product);

  return {
    product,
    isLoading
  };
};

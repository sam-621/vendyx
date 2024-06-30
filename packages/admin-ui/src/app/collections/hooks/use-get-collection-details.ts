import { useFragment } from '@/lib/ebloc/codegen';
import { CommonCollection, GetCollectionDetailsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

export const useGetCollectionDetails = (id: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetCollectionDetailsQuery,
    variables: { id }
  });
  const collection = useFragment(CommonCollection, data?.collection);

  return {
    collection,
    isLoading
  };
};

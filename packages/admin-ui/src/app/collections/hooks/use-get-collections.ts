import { GetCollectionsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

export const useGetCollections = () => {
  const { data, isLoading } = useGqlQuery({ document: GetCollectionsQuery });

  return {
    collections: data?.collections.items ?? [],
    isLoading
  };
};

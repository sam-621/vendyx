import { GetCollectionsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { CollectionKeys } from './collection.keys';

export const useGetCollections = () => {
  const { data, isLoading } = useGqlQuery({
    document: GetCollectionsQuery,
    key: CollectionKeys.all
  });

  return {
    collections: data?.collections.items ?? [],
    isLoading
  };
};

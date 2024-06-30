import { useFragment } from '@/lib/ebloc/codegen';
import { CommonCollection, GetCollectionDetailsQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { CollectionKeys } from './collection.keys';

export const useGetCollectionDetails = (id: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetCollectionDetailsQuery,
    variables: { id },
    key: CollectionKeys.single(id)
  });
  const collection = useFragment(CommonCollection, data?.collection);

  return {
    collection,
    isLoading
  };
};

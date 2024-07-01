import { type CreateCollectionInput } from '@/lib/ebloc/codegen/graphql';
import { getCollectionErrorMessage } from '@/lib/ebloc/errors';
import { CreateCollectionMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useCreateCollection = () => {
  const { mutateAsync } = useGqlMutation(CreateCollectionMutation);

  const createCollection = async (input: CreateCollectionInput) => {
    const {
      createCollection: { apiErrors, collection }
    } = await mutateAsync({ input });

    const errorMessage = getCollectionErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return { errorMessage };
    }

    return { id: collection?.id };
  };

  return {
    createCollection
  };
};

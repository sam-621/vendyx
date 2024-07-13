import { type CreateZoneInput } from '@/lib/ebloc/codegen/graphql';
import { getZoneErrorMessage } from '@/lib/ebloc/errors';
import { CreateZoneMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useCreateZone = () => {
  const { mutateAsync } = useGqlMutation(CreateZoneMutation);

  const createZone = async (input: CreateZoneInput) => {
    const {
      createZone: { apiErrors, zone }
    } = await mutateAsync({ input });

    const error = getZoneErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { zone };
  };

  return { createZone };
};

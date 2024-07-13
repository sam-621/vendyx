import { type UpdateZoneInput } from '@/lib/ebloc/codegen/graphql';
import { getZoneErrorMessage } from '@/lib/ebloc/errors';
import { UpdateZoneMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateZone = () => {
  const { mutateAsync } = useGqlMutation(UpdateZoneMutation);

  const updateZone = async (id: string, input: UpdateZoneInput) => {
    const {
      updateZone: { apiErrors, zone }
    } = await mutateAsync({ id, input });

    const error = getZoneErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { zone };
  };

  return { updateZone };
};

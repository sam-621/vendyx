import { getZoneErrorMessage } from '@/lib/ebloc/errors';
import { RemoveZoneMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveZone = () => {
  const { mutateAsync } = useGqlMutation(RemoveZoneMutation);

  const removeZone = async (id: string) => {
    const {
      removeZone: { apiErrors, success }
    } = await mutateAsync({ id });

    const error = getZoneErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { success };
  };

  return { removeZone };
};

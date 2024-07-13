import { getZoneErrorMessage } from '@/lib/ebloc/errors';
import { SetCountriesToZoneMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useSetCountriesToZone = () => {
  const { mutateAsync } = useGqlMutation(SetCountriesToZoneMutation);

  const setCountriesToZone = async (id: string, countriesIds: string[]) => {
    const {
      setCountriesToZone: { apiErrors, zone }
    } = await mutateAsync({ id, countriesIds });

    const error = getZoneErrorMessage(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { zone };
  };

  return {
    setCountriesToZone
  };
};

import { getCountryErrorMessage } from '@/lib/ebloc/errors';
import { RemoveCountryMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveCountry = () => {
  const { mutateAsync } = useGqlMutation(RemoveCountryMutation);

  const removeCountry = async (id: string) => {
    const {
      removeCountry: { apiErrors, success }
    } = await mutateAsync({ id });

    const errorMessage = getCountryErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return { error: errorMessage };
    }

    return { success };
  };

  return {
    removeCountry
  };
};

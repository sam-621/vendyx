import { getCountryErrorMessage } from '@/lib/ebloc/errors';
import { RemoveStatesFromCountryMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useRemoveStatesFromCountry = () => {
  const { mutateAsync } = useGqlMutation(RemoveStatesFromCountryMutation);

  const removeStatesFromCountry = async (id: string, input: string[]) => {
    const {
      removeStatesFromCountry: { apiErrors, country }
    } = await mutateAsync({ id, input });

    const errorMessage = getCountryErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return errorMessage;
    }

    return country;
  };

  return {
    removeStatesFromCountry
  };
};

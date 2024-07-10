import { type UpdateCountryInput } from '@/lib/ebloc/codegen/graphql';
import { getCountryErrorMessage } from '@/lib/ebloc/errors';
import { UpdateCountryMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useUpdateCountry = () => {
  const { mutateAsync } = useGqlMutation(UpdateCountryMutation);

  const createCountry = async (id: string, input: UpdateCountryInput) => {
    const {
      updateCountry: { apiErrors, country }
    } = await mutateAsync({ id, input });

    const errorMessage = getCountryErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return errorMessage;
    }

    return country;
  };

  return {
    createCountry
  };
};

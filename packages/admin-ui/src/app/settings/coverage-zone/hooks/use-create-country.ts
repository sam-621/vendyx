import { type CreateCountryInput } from '@/lib/ebloc/codegen/graphql';
import { getCountryErrorMessage } from '@/lib/ebloc/errors';
import { CreateCountryMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useCreateCountry = () => {
  const { mutateAsync } = useGqlMutation(CreateCountryMutation);

  const createCountry = async (input: CreateCountryInput) => {
    const {
      createCountry: { apiErrors, country }
    } = await mutateAsync({ input });

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

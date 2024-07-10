import { type CreateStateInput } from '@/lib/ebloc/codegen/graphql';
import { getCountryErrorMessage } from '@/lib/ebloc/errors';
import { AddStatesToCountryMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

export const useAddStatesToCountry = () => {
  const { mutateAsync } = useGqlMutation(AddStatesToCountryMutation);

  const addStateToCountry = async (id: string, input: CreateStateInput[]) => {
    const {
      addStatesToCountry: { apiErrors }
    } = await mutateAsync({ id, input });

    const errorMessage = getCountryErrorMessage(apiErrors[0]);

    if (errorMessage) {
      return errorMessage;
    }
  };

  return {
    addStateToCountry
  };
};

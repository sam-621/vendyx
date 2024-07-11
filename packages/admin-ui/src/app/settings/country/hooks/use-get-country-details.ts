import { useFragment } from '@/lib/ebloc/codegen';
import { CommonCountry, GetCountryQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { CountryKeys } from './country.keys';

export const useGetCountryDetails = (id: string) => {
  const { data, isLoading } = useGqlQuery({
    document: GetCountryQuery,
    variables: { id },
    key: CountryKeys.single(id)
  });
  const country = useFragment(CommonCountry, data?.country);

  return {
    country,
    isLoading
  };
};

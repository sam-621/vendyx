import { useFragment } from '@/lib/ebloc/codegen';
import { CommonCountry, GetCountriesQuery } from '@/lib/ebloc/queries';
import { useGqlQuery } from '@/lib/gql';

import { CountryKeys } from './country.keys';

export const useGetCountries = () => {
  const { data } = useGqlQuery({ document: GetCountriesQuery, key: CountryKeys.all });

  const countries = data?.countries.items.map(country => useFragment(CommonCountry, country)) ?? [];

  return {
    countries
  };
};

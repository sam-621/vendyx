import { getFragmentData } from '../codegen';
import { COMMON_COUNTRY_FRAGMENT, GET_ALL_COUNTRIES_QUERY } from '../operations/country.operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const CountryService = {
  Tags: {
    countries: 'countries'
  },

  async getAll() {
    const result = await serviceGqlFetcher(
      GET_ALL_COUNTRIES_QUERY,
      {},
      { revalidate: Infinity, cache: null }
    );

    const countries = getFragmentData(COMMON_COUNTRY_FRAGMENT, result.countries);

    return countries;
  }
};

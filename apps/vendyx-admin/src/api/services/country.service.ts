import { GET_ALL_COUNTRIES_QUERY } from '../operations/country.operations';
import { fetcher } from './fetcher';

export const CountryService = {
  Tags: {
    countries: 'countries'
  },

  async getAll() {
    const { countries } = await fetcher(
      GET_ALL_COUNTRIES_QUERY,
      {},
      { tags: [CountryService.Tags.countries] }
    );

    return countries;
  }
};

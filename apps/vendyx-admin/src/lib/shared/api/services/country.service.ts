import { GET_ALL_COUNTRIES_QUERY } from '../operations/country.operations';
import { fetcher } from './fetcher';

export const CountryService = {
  async getAll() {
    const { countries } = await fetcher(GET_ALL_COUNTRIES_QUERY);

    return countries;
  }
};

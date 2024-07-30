import { graphql } from '../codegen';

export const CommonCountry = graphql(`
  fragment CommonCountry on Country {
    id
    createdAt
    name
    enabled
  }
`);

export const GetCountriesQuery = graphql(`
  query GetCountries {
    countries {
      count
      items {
        ...CommonCountry
      }
    }
  }
`);

export const GetCountryQuery = graphql(`
  query GetCountry($id: ID!) {
    country(id: $id) {
      ...CommonCountry
    }
  }
`);

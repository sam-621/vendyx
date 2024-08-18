import { graphql } from '../codegen';

export const GET_ALL_COUNTRIES = graphql(`
  query GetCountries {
    countries {
      id
      name
      states {
        id
        name
      }
    }
  }
`);

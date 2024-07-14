import { graphql } from '../codegen';

export const GetAdminUiConfigQuery = graphql(`
  query GetAdminUiConfig {
    adminUiConfig {
      branding {
        name
        description
      }
      extraUiModules {
        id
        label
        slug
        icon
      }
      priceCalculators {
        name
        code
        args {
          type
          label
          placeholder
          defaultValue
          conditions {
            min
            max
          }
        }
      }
    }
  }
`);

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
          key
          type
          label
          placeholder
          defaultValue
          conditions {
            min
            max
          }
          options {
            label
            value
          }
        }
      }
    }
  }
`);

import { type CodegenConfig } from '@graphql-codegen/cli';

const GQL_SCHEMA_URL = process.env.VENDYX_ADMIN_API_URL;

const config: CodegenConfig = {
  schema: GQL_SCHEMA_URL,
  documents: ['./src/lib/shared/api/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/shared/api/codegen/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      },
      config: {
        documentMode: 'string'
      }
    }
  }
};

export default config;

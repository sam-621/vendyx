import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/admin-api',
  documents: ['./src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  config: {
    operationResultSuffix: 'RAndom'
  },
  generates: {
    './src/lib/shared/ebloc/codegen/': {
      preset: 'client',
      config: {
        skipTypename: true
      }
    }
  }
};

export default config;

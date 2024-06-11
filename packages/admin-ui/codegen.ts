import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/admin-api',
  documents: ['./src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/lib/ebloc/codegen/': {
      preset: 'client'
    }
  }
};

export default config;

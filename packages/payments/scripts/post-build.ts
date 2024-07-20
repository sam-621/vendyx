import { dest, parallel, src } from 'gulp';

/**
 * Copy gql schema files to dist folder
 * This is needed to make the schema file available for the reference in the graphql module when used in the server package
 * This is because the schema files are not copied to the dist folder by default
 * And when trying to reference for the graphql module it will not be found and it will throw an error
 */
export const copySchemaToDistFolder = () => {
  const stream = src('../src/**/*.schema.gql');

  return stream.pipe(dest('../dist'));
};

export const postBuild = parallel(copySchemaToDistFolder);

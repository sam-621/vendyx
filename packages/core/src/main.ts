import { NestFactory } from '@nestjs/core';
import { dest, series, src } from 'gulp';

import { BusinessExceptionFilter } from './app/api/common';
import { AppModule } from './app/app.module';
import { VendyxConfig, getConfig, setConfig } from './app/config';

/**
 * Copy gql schema files to dist folder
 * This is needed to make the schema file available for the reference in the graphql module
 */
function copySchemaToDistFolder() {
  src('./src/**/*.schema.gql').pipe(dest('./dist'));
}

export async function bootstrap(config: VendyxConfig) {
  setConfig(config);

  const { port } = getConfig().app;

  series(copySchemaToDistFolder)(() =>
    console.log('Schema copied to dist folder'),
  );

  const app = await NestFactory.create(AppModule, {
    // TODO: Check this to do it the right way
    cors: true,
  });

  app.useGlobalFilters(new BusinessExceptionFilter());

  await app.listen(port);
}

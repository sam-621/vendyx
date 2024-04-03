import { NestFactory } from '@nestjs/core';

import { BusinessExceptionFilter } from './app/api/common';
import { AppModule } from './app/app.module';
import { VendyxConfig, getConfig, setConfig } from './app/config';

export async function bootstrap(config: VendyxConfig) {
  setConfig(config);

  const { port } = getConfig().app;

  const app = await NestFactory.create(AppModule, {
    // TODO: Check this to do it the right way
    cors: true,
  });

  app.useGlobalFilters(new BusinessExceptionFilter());

  await app.listen(port);
}

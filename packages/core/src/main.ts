import { NestFactory } from '@nestjs/core';

import { BusinessExceptionFilter } from './app/api/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // TODO: Check this to do it the right way
    cors: true,
  });

  app.useGlobalFilters(new BusinessExceptionFilter());

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';

import { PrismaClientExceptionFilter, clsMiddleware } from './api/shared';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(clsMiddleware);
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  await app.listen(3000);
}
bootstrap();

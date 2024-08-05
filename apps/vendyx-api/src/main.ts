import { NestFactory } from '@nestjs/core';

import { clsMiddleware } from './api/shared';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(clsMiddleware);

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';

import { PrismaClientExceptionFilter, clsMiddleware } from './api/shared';
import { AppModule } from './app.module';
import { AuthService } from './auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authService = app.get(AuthService);

  app.use(clsMiddleware(authService));
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  await app.listen(5000);
}
bootstrap();

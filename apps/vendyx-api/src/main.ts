import { NestFactory } from '@nestjs/core';

import {
  GlobalExceptionFilter,
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
  clsMiddleware
} from './api/shared';
import { AppModule } from './app.module';
import { AuthService } from './auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authService = app.get(AuthService);

  app.use(clsMiddleware(authService));
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter()
  );

  await app.listen(5000);
}
bootstrap();

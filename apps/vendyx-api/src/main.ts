import { NestFactory } from '@nestjs/core';
import { ClsMiddleware } from 'nestjs-cls';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    new ClsMiddleware({
      async setup(cls, req, res) {
        cls.set('shop_id', req.headers.shop_id);
        cls.set('owner_id', req.headers.owner_id);
      }
    }).use
  );

  await app.listen(3000);
}
bootstrap();

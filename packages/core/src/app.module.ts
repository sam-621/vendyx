import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaVendyxModule } from './persistance/prisma-vendyx.module';

@Module({
  imports: [PrismaVendyxModule, ClsModule.forRoot({ global: true, middleware: { mount: true } })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

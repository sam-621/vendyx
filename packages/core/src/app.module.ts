import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClsModule } from 'nestjs-cls';
import { PrismaTenancyModule } from './persistance/prisma-tenancy.module';

@Module({
  imports: [PrismaTenancyModule, ClsModule.forRoot({ global: true, middleware: { mount: true } })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

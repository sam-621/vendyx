import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistanceModule } from './persistance/persistance.module';

@Module({
  imports: [PersistanceModule, ClsModule.forRoot({ global: true, middleware: { mount: true } })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

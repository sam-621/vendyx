import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { ConfigModule } from './config';
import { EventBusModule } from './event-bus';
import { PersistanceModule } from './persistance';
import { PluginModule } from './plugin';
import { SecurityModule } from './security';

@Module({
  imports: [
    ConfigModule,
    PersistanceModule,
    SecurityModule,
    ApiModule,
    EventBusModule,
    PluginModule.register()
  ]
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { ConfigModule } from './config';
import { EventModule } from './events';
import { PersistanceModule } from './persistance';
import { PluginModule } from './plugin';
import { SecurityModule } from './security';

@Module({
  imports: [
    ConfigModule,
    PersistanceModule,
    SecurityModule,
    ApiModule,
    EventModule,
    PluginModule.register()
  ]
})
export class AppModule {}

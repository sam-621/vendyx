import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { EventModule } from './events';
import { PersistanceModule } from './persistance';
import { PluginModule } from './plugins';
import { SecurityModule } from './security';

@Module({
  imports: [PluginModule.register(), PersistanceModule, SecurityModule, ApiModule, EventModule]
})
export class AppModule {}

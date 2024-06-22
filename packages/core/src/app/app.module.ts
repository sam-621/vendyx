import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { EventModule } from './events';
import { PersistanceModule } from './persistance';
import { SecurityModule } from './security';

@Module({
  imports: [PersistanceModule, SecurityModule, ApiModule, EventModule]
})
export class AppModule {}

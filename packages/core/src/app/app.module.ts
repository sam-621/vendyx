import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { PersistanceModule } from './persistance';
import { SecurityModule } from './security';

@Module({
  imports: [PersistanceModule, SecurityModule, ApiModule],
})
export class AppModule {}

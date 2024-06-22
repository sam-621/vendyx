import { Module } from '@nestjs/common';

import { AdminUiConfigController } from './admin-ui-config.controller';

@Module({
  controllers: [AdminUiConfigController]
})
export class AdminUiConfigModule {}

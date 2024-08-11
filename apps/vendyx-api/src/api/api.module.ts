import { Module } from '@nestjs/common';

import { AdminApiModule } from './admin/admin-api.module';
import { UploadModule } from './upload';

@Module({
  imports: [UploadModule, AdminApiModule.register()]
})
export class ApiModule {}

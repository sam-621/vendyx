import { Module } from '@nestjs/common';

import { AdminResolver } from './resolvers/admin.resolver';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [AdminResolver],
})
export class AdminApiModule {}

import { Module } from '@nestjs/common';

import { AdminResolver, ProductResolver } from './resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [AdminResolver, ProductResolver],
})
export class AdminApiModule {}

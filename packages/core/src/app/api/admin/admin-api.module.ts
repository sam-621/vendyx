import { Module } from '@nestjs/common';

import { AdminResolver, ProductResolver, VariantResolver } from './resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [AdminResolver, ProductResolver, VariantResolver],
})
export class AdminApiModule {}

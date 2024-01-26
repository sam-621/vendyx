import { Module } from '@nestjs/common';

import {
  AdminResolver,
  OptionResolver,
  ProductResolver,
  VariantResolver,
} from './resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [AdminResolver, ProductResolver, VariantResolver, OptionResolver],
})
export class AdminApiModule {}

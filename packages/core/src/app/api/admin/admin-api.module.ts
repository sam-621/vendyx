import { Module } from '@nestjs/common';

import {
  AdminResolver,
  OptionResolver,
  OrderResolver,
  ProductResolver,
  VariantResolver,
} from './resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [
    AdminResolver,
    ProductResolver,
    VariantResolver,
    OptionResolver,
    OrderResolver,
  ],
})
export class AdminApiModule {}

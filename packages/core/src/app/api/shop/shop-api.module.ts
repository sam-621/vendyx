import { Module } from '@nestjs/common';

import {
  OrderLineResolver,
  OrderResolver,
  ProductResolver,
  VariantResolver,
} from './resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [
    OrderResolver,
    ProductResolver,
    VariantResolver,
    OrderLineResolver,
  ],
})
export class ShopApiModule {}

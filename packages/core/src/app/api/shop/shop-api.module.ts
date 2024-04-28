import { Module } from '@nestjs/common';

import { OrderResolver, ProductResolver, VariantResolver } from './resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [OrderResolver, ProductResolver, VariantResolver],
})
export class ShopApiModule {}

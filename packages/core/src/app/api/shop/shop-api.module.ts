import { Module } from '@nestjs/common';

import { OrderResolver } from './resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [OrderResolver],
})
export class ShopApiModule {}

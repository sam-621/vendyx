import { Module } from '@nestjs/common';

import {
  AdminResolver,
  OptionResolver,
  OrderResolver,
  ProductResolver,
  VariantResolver,
} from './resolvers';
import { COMMON_RESOLVERS } from '../common/common-resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [
    ...COMMON_RESOLVERS,
    AdminResolver,
    ProductResolver,
    VariantResolver,
    OptionResolver,
    OrderResolver,
  ],
})
export class AdminApiModule {}

import { Module } from '@nestjs/common';

import {
  AdminResolver,
  OptionResolver,
  OrderResolver,
  ProductResolver,
  VariantResolver,
} from './resolvers';
import {
  OrderLineCommonResolver,
  ProductCommonResolver,
  VariantCommonResolver,
} from '../common/resolvers';

import { ServiceModule } from '@/app/service';

const COMMON_RESOLVERS = [
  OrderLineCommonResolver,
  ProductCommonResolver,
  VariantCommonResolver,
];

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

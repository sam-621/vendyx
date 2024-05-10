import { Module } from '@nestjs/common';

import {
  OrderResolver,
  PaymentMethodResolver,
  ProductResolver,
  VariantResolver,
} from './resolvers';
import {
  OrderCommonResolver,
  OrderLineCommonResolver,
  ProductCommonResolver,
  VariantCommonResolver,
} from '../common/resolvers';

import { ServiceModule } from '@/app/service';

const COMMON_RESOLVERS = [
  OrderLineCommonResolver,
  OrderCommonResolver,
  ProductCommonResolver,
  VariantCommonResolver,
  PaymentMethodResolver,
];

@Module({
  imports: [ServiceModule],
  providers: [
    ...COMMON_RESOLVERS,
    OrderResolver,
    ProductResolver,
    VariantResolver,
  ],
})
export class ShopApiModule {}

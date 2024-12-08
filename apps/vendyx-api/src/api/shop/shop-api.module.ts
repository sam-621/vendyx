import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import { BusinessModule } from '@/business';
import { PaymentModule } from '@/payment';
import { ShipmentModule } from '@/shipments';

import {
  AddressResolver,
  CollectionResolver,
  CountryResolver,
  CustomerResolver,
  OrderResolver,
  ProductResolver
} from './resolvers';
import { COMMON_RESOLVERS, GraphqlApiModule, SHARED_SCHEMA_PATH } from '../shared';

const SHOP_API_SCHEMA_PATH = './src/api/shop/gql/**/*.gql';

@Module({})
export class ShopApiModule {
  static register(): DynamicModule {
    return {
      ...GraphqlApiModule.register({
        include: [ShopModule],
        path: '/shop-api',
        typePaths: [
          ...[SHARED_SCHEMA_PATH, SHOP_API_SCHEMA_PATH].map(p => path.join(process.cwd(), p))
        ]
      })
    };
  }
}

@Module({
  imports: [BusinessModule, ShipmentModule, PaymentModule],
  providers: [
    ...COMMON_RESOLVERS,
    ProductResolver,
    OrderResolver,
    CustomerResolver,
    CollectionResolver,
    CountryResolver,
    AddressResolver
  ]
})
class ShopModule {}

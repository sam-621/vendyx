import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import { BusinessModule } from '@/business';
import { ShipmentModule } from '@/shipments';

import {
  CollectionResolver,
  CountryResolver,
  CustomerResolver,
  MetricsResolver,
  OptionResolver,
  OrderResolver,
  PaymentMethodResolver,
  ProductResolver,
  ShippingMethodResolver,
  ShopResolver,
  StateResolver,
  SubscriptionResolver,
  UserResolver,
  VariantResolver,
  ZoneResolver
} from './resolvers';
import { COMMON_RESOLVERS, GraphqlApiModule, SHARED_SCHEMA_PATH } from '../shared';

const ADMIN_API_SCHEMA_PATH = './src/api/admin/gql/**/*.gql';

@Module({})
export class AdminApiModule {
  static register(): DynamicModule {
    return {
      ...GraphqlApiModule.register({
        include: [AdminModule],
        path: '/admin-api',
        typePaths: [
          ...[SHARED_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map(p => path.join(process.cwd(), p))
        ]
      })
    };
  }
}

@Module({
  imports: [ShipmentModule, BusinessModule],
  providers: [
    ...COMMON_RESOLVERS,
    UserResolver,
    ShopResolver,
    ProductResolver,
    VariantResolver,
    OptionResolver,
    PaymentMethodResolver,
    ShippingMethodResolver,
    CountryResolver,
    ZoneResolver,
    StateResolver,
    OrderResolver,
    CustomerResolver,
    MetricsResolver,
    SubscriptionResolver,
    CollectionResolver
  ]
})
class AdminModule {}

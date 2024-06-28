import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import {
  CustomerResolver,
  OrderResolver,
  PaymentMethodResolver,
  ProductResolver,
  ShippingMethodResolver,
  VariantResolver
} from './resolvers';
import { COMMON_RESOLVERS } from '../common/common-resolvers';
import { GraphqlApiModule } from '../common/graphql-api.module';

import { getPluginResolvers, getPluginTypePaths } from '@/app/plugin';
import { ServiceModule } from '@/app/service';

const STOREFRONT_API_SCHEMA_PATH = './gql/**/*.schema.gql';
const COMMON_SCHEMA_PATH = '../common/**/*.schema.gql';

@Module({})
export class StorefrontApiModule {
  static register(): DynamicModule {
    return {
      ...GraphqlApiModule.register({
        include: [StorefrontModule],
        path: '/storefront-api',
        typePaths: [
          ...[COMMON_SCHEMA_PATH, STOREFRONT_API_SCHEMA_PATH].map(p => path.join(__dirname, p)),
          ...getPluginTypePaths('storefront')
        ]
      })
    };
  }
}

@Module({
  imports: [ServiceModule],
  providers: [
    ...COMMON_RESOLVERS,
    OrderResolver,
    ProductResolver,
    VariantResolver,
    PaymentMethodResolver,
    ShippingMethodResolver,
    CustomerResolver,
    ...getPluginResolvers('storefront')
  ]
})
class StorefrontModule {}

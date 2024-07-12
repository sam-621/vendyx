import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import {
  AdminResolver,
  AssetResolver,
  CollectionResolver,
  CountryResolver,
  CustomerResolver,
  OptionResolver,
  OrderResolver,
  ProductResolver,
  ShippingMethodResolver,
  VariantResolver,
  ZoneResolver
} from './resolvers';
import { COMMON_RESOLVERS } from '../common/common-resolvers';
import { GraphqlApiModule } from '../common/graphql-api.module';

import { getPluginResolvers, getPluginTypePaths } from '@/app/plugin';
import { ServiceModule } from '@/app/service';

const ADMIN_API_SCHEMA_PATH = './gql/**/*.schema.gql';
const COMMON_SCHEMA_PATH = '../common/**/*.schema.gql';

@Module({})
export class AdminApiModule {
  static register(): DynamicModule {
    return {
      ...GraphqlApiModule.register({
        include: [AdminModule],
        path: '/admin-api',
        typePaths: [
          ...[COMMON_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map(p => path.join(__dirname, p)),
          ...getPluginTypePaths('admin')
        ]
      })
    };
  }
}

@Module({
  imports: [ServiceModule],
  providers: [
    ...COMMON_RESOLVERS,
    AdminResolver,
    ProductResolver,
    VariantResolver,
    OptionResolver,
    OrderResolver,
    CustomerResolver,
    CollectionResolver,
    AssetResolver,
    CountryResolver,
    ZoneResolver,
    ShippingMethodResolver,
    ...getPluginResolvers('admin')
  ]
})
class AdminModule {}

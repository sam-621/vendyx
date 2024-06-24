import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import {
  OrderResolver,
  PaymentMethodResolver,
  ProductResolver,
  ShippingMethodResolver,
  VariantResolver
} from './resolvers';
import { COMMON_RESOLVERS } from '../common/common-resolvers';
import { GraphqlApiModule } from '../common/graphql-api.module';

import { getConfig } from '@/app/config';
import { EBlocPluginMetadataKeys, GraphqlApiExtension, getPluginMetadata } from '@/app/plugin';
import { ServiceModule } from '@/app/service';

const STOREFRONT_API_SCHEMA_PATH = './gql/**/*.schema.gql';
const COMMON_SCHEMA_PATH = '../common/**/*.schema.gql';

@Module({})
export class StorefrontApiModule {
  static register(): DynamicModule {
    const { plugins } = getConfig();

    const storefrontApiExtensions = plugins.map(p =>
      getPluginMetadata<GraphqlApiExtension>(EBlocPluginMetadataKeys.STOREFRONT_API_EXTENSIONS, p)
    );

    const extensionsTypePaths = storefrontApiExtensions
      .map(apiExtension => apiExtension.typePaths)
      .flat();

    return {
      ...GraphqlApiModule.register({
        include: [StorefrontModule],
        path: '/storefront-api',
        typePaths: [
          ...[COMMON_SCHEMA_PATH, STOREFRONT_API_SCHEMA_PATH].map(p => path.join(__dirname, p)),
          ...extensionsTypePaths
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
    ...(() => {
      const { plugins } = getConfig();

      const storefrontApiExtensions = plugins.map(p =>
        getPluginMetadata<GraphqlApiExtension>(EBlocPluginMetadataKeys.STOREFRONT_API_EXTENSIONS, p)
      );

      const extensionsResolvers = storefrontApiExtensions
        .map(apiExtension => apiExtension.resolvers)
        .flat();

      return extensionsResolvers;
    })()
  ]
})
class StorefrontModule {}

import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import {
  AdminResolver,
  OptionResolver,
  OrderResolver,
  ProductResolver,
  VariantResolver
} from './resolvers';
import { COMMON_RESOLVERS } from '../common/common-resolvers';
import { GraphqlApiModule } from '../common/graphql-api.module';

import { getConfig } from '@/app/config';
import { EBlocPluginMetadataKeys, GraphqlApiExtension, getPluginMetadata } from '@/app/plugin';
import { ServiceModule } from '@/app/service';

const ADMIN_API_SCHEMA_PATH = './gql/**/*.schema.gql';
const COMMON_SCHEMA_PATH = '../common/**/*.schema.gql';

@Module({})
export class AdminApiModule {
  static register(): DynamicModule {
    const { plugins } = getConfig();

    const storefrontApiExtensions = plugins.map(p =>
      getPluginMetadata<GraphqlApiExtension>(EBlocPluginMetadataKeys.ADMIN_API_EXTENSIONS, p)
    );

    const extensionsTypePaths = storefrontApiExtensions
      .map(apiExtension => apiExtension.typePaths)
      .flat();

    return {
      ...GraphqlApiModule.register({
        include: [AdminModule],
        path: '/admin-api',
        typePaths: [
          ...[COMMON_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map(p => path.join(__dirname, p)),
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
    AdminResolver,
    ProductResolver,
    VariantResolver,
    OptionResolver,
    OrderResolver,
    ...(() => {
      const { plugins } = getConfig();

      const storefrontApiExtensions = plugins.map(p =>
        getPluginMetadata<GraphqlApiExtension>(EBlocPluginMetadataKeys.ADMIN_API_EXTENSIONS, p)
      );

      const extensionsResolvers = storefrontApiExtensions
        .map(apiExtension => apiExtension.resolvers)
        .flat();

      return extensionsResolvers;
    })()
  ]
})
class AdminModule {}

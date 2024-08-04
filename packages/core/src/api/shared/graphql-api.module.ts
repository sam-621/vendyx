import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

/**
 * Module to create a GraphQL API used for /admin-api and /storefront-api
 */
@Module({})
export class GraphqlApiModule {
  static register(options: GraphqlApiModuleOptions): DynamicModule {
    return {
      imports: options.include,
      ...GraphQLModule.forRoot<ApolloDriverConfig>({
        // false to use apollo studio
        playground: false,
        resolvers: { JSON: GraphQLJSON },
        // TODO: false in production, true in dev
        includeStacktraceInErrorResponses: true,
        // Always true because the graphql playground must be public
        introspection: true,
        driver: ApolloDriver,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        path: options.path,
        typePaths: options.typePaths,
        include: options.include
      })
    };
  }
}

type GraphqlApiModuleOptions = {
  include: any[];
  typePaths: string[];
  path: string;
};

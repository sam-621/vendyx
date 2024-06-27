import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({})
export class GraphqlApiModule {
  static register(options: GraphqlApiModuleOptions): DynamicModule {
    return {
      imports: options.include,
      ...GraphQLModule.forRoot<ApolloDriverConfig>({
        // false to use apollo studio
        playground: true,
        // TODO: false in production, true in dev
        includeStacktraceInErrorResponses: true,
        // Always true because the graphql playground must be public
        introspection: true,
        driver: ApolloDriver,
        // plugins: [ApolloServerPluginLandingPageLocalDefault()],
        formatError: error => {
          return {
            message: error.message,
            code: error.extensions?.code
          };
        },
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

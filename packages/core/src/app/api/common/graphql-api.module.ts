import * as path from 'path';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
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
        playground: false,
        // TODO: false in production, true in dev
        includeStacktraceInErrorResponses: true,
        driver: ApolloDriver,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        formatError: (error) => {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        },
        // definitions: {
        //   path: path.join(
        //     process.cwd(),
        //     './src/app/api/common/types/gql.types.ts',
        //   ),
        //   outputAs: 'class',
        // },
        path: options.path,
        typePaths: options.typePaths,
        include: options.include,
      }),
    };
  }
}

type GraphqlApiModuleOptions = {
  include: any[];
  typePaths: string[];
  path: string;
};

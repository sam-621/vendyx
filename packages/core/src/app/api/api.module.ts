import path from 'path';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AdminApiModule } from './admin';

const COMMON_SCHEMA_PATH = './common/**/*.schema.gql';
const ADMIN_API_SCHEMA_PATH = './admin/**/*.schema.gql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // false to use apollo studio
      playground: false,
      // false in production, true in dev
      includeStacktraceInErrorResponses: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error) => {
        return {
          message: error.message,
          code: error.extensions?.code,
        };
      },
      path: '/admin-api',
      typePaths: [COMMON_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map((p) =>
        path.join(process.cwd(), p),
      ),
      definitions: {
        path: path.join(process.cwd(), './common/types/gql.types.ts'),
        outputAs: 'class',
      },
      include: [AdminApiModule],
    }),
  ],
})
export class ApiModule {}

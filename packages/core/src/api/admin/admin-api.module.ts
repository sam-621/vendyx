import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import { GraphqlApiModule } from '../shared';

const ADMIN_API_SCHEMA_PATH = './gql/**/*.gql';
const SHARED_SCHEMA_PATH = '../shared/**/*.gql';

@Module({})
export class AdminApiModule {
  static register(): DynamicModule {
    return {
      ...GraphqlApiModule.register({
        include: [AdminModule],
        path: '/admin-api',
        typePaths: [
          ...[SHARED_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map(p => path.join(__dirname, p))
        ]
      })
    };
  }
}

@Module({})
class AdminModule {}

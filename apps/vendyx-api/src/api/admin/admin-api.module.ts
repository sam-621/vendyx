import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import { BusinessModule } from '@/business';

import { ShopResolver, UserResolver } from './resolvers';
import { GraphqlApiModule } from '../shared';

const ADMIN_API_SCHEMA_PATH = './src/api/admin/gql/**/*.gql';
const SHARED_SCHEMA_PATH = './src/api/shared/**/*.gql';

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
  imports: [BusinessModule],
  providers: [UserResolver, ShopResolver]
})
class AdminModule {}

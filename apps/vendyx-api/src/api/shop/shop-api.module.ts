import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import { BusinessModule } from '@/business';

import { GraphqlApiModule, SHARED_SCHEMA_PATH } from '../shared';

@Module({})
export class ShopApiModule {
  static register(): DynamicModule {
    return {
      ...GraphqlApiModule.register({
        include: [ShopModule],
        path: '/shop-api',
        typePaths: [...[SHARED_SCHEMA_PATH].map(p => path.join(process.cwd(), p))]
      })
    };
  }
}

@Module({
  imports: [BusinessModule],
  providers: []
})
class ShopModule {}

import * as path from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AdminApiModule } from './admin';
import { GraphqlApiModule } from './common/graphql-api.module';
import { ShopApiModule } from './shop/shop-api.module';
import { UploadModule } from './upload';

const COMMON_SCHEMA_PATH = './common/**/*.schema.gql';
const ADMIN_API_SCHEMA_PATH = './admin/**/*.schema.gql';
const SHOP_API_SCHEMA_PATH = './shop/**/*.schema.gql';

@Module({
  imports: [
    UploadModule,
    GraphqlApiModule.register({
      include: [AdminApiModule],
      path: '/admin-api',
      typePaths: [COMMON_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map((p) =>
        path.join(__dirname, p),
      ),
    }),
    GraphqlApiModule.register({
      include: [ShopApiModule],
      path: '/shop-api',
      typePaths: [COMMON_SCHEMA_PATH, SHOP_API_SCHEMA_PATH].map((p) =>
        path.join(__dirname, p),
      ),
    }),
    ServeStaticModule.forRoot({
      // TODO: move admin-ui dist folder into core package
      rootPath: path.join(__dirname, '../../admin-ui'),
      serveRoot: '/admin',
      exclude: ['/api/(.*)'],
    }),
  ],
})
export class ApiModule {}

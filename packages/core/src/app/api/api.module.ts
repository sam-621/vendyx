import * as path from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AdminApiModule } from './admin';
import { AdminUiConfigModule } from './admin-ui-config';
import { GraphqlApiModule } from './common/graphql-api.module';
import { StorefrontApiModule } from './storefront/storefront-api.module';
import { UploadModule } from './upload';

const COMMON_SCHEMA_PATH = './common/**/*.schema.gql';
const ADMIN_API_SCHEMA_PATH = './admin/**/*.schema.gql';
const STOREFRONT_API_SCHEMA_PATH = './storefront/**/*.schema.gql';

@Module({
  imports: [
    AdminUiConfigModule,
    UploadModule,
    GraphqlApiModule.register({
      include: [AdminApiModule],
      path: '/admin-api',
      typePaths: [COMMON_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map(p => path.join(__dirname, p))
    }),
    GraphqlApiModule.register({
      include: [StorefrontApiModule],
      path: '/storefront-api',
      typePaths: [COMMON_SCHEMA_PATH, STOREFRONT_API_SCHEMA_PATH].map(p => path.join(__dirname, p))
    }),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        return [
          {
            // rootPath: path.join(__dirname, '../../admin-ui'),
            rootPath: path.join(process.cwd(), '/admin-ui'),
            serveRoot: '/admin',
            exclude: ['/api/(.*)']
          }
        ];
      }
    })
  ]
})
export class ApiModule {}

import * as path from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AdminApiModule } from './admin';
import { AdminUiConfigModule } from './admin-ui-config';
import { StorefrontApiModule } from './storefront/storefront-api.module';
import { UploadModule } from './upload';

@Module({
  imports: [
    AdminUiConfigModule,
    UploadModule,
    AdminApiModule.register(),
    StorefrontApiModule.register(),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        return [
          {
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

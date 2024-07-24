import * as path from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AdminApiModule } from './admin';
import { StorefrontApiModule } from './storefront/storefront-api.module';
import { UploadModule } from './upload';

@Module({
  imports: [
    UploadModule,
    AdminApiModule.register(),
    StorefrontApiModule.register(),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        return [
          {
            rootPath: path.join(__dirname, '../../', '/admin-ui'),
            serveRoot: '/admin',
            exclude: ['/api/(.*)']
          }
        ];
      }
    })
  ]
})
export class ApiModule {}

import * as path from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AdminApiModule } from './admin';
import { StorefrontApiModule } from './storefront/storefront-api.module';
import { UploadModule } from './upload';
import { getConfig } from '../config';
import { EBlocPluginMetadataKeys, UiModuleConfig, getPluginMetadata } from '../plugin';

@Module({
  imports: [
    UploadModule,
    AdminApiModule.register(),
    StorefrontApiModule.register(),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        const { plugins } = getConfig();

        const uiModules = plugins
          .map(plugin =>
            getPluginMetadata<UiModuleConfig>(EBlocPluginMetadataKeys.UI_MODULES, plugin)
          )
          .filter(uiModules => uiModules)
          .flat();

        const restConfig =
          uiModules.map(uiModule => {
            return {
              rootPath: uiModule.compiledUiModule.path,
              serveRoot: `/${uiModule.compiledUiModule.rename}`,
              exclude: ['/api/(.*)']
            };
          }) ?? [];

        return [
          {
            rootPath: path.join(__dirname, '../../', '/admin-ui'),
            serveRoot: '/admin',
            exclude: ['/api/(.*)']
          },
          ...restConfig
        ];
      }
    })
  ]
})
export class ApiModule {}

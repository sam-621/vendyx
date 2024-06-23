import { DynamicModule, Module } from '@nestjs/common';

import { getConfig } from '../config';

/**
 * Plugin module
 *
 * @description
 * Integrates EBloc plugins into EBloc application
 */
@Module({})
export class PluginModule {
  static register(): DynamicModule {
    const plugins = getConfig().plugins;

    return {
      module: PluginModule,
      imports: plugins
    };
  }
}

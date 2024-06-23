import { PluginConfig } from '@ebloc/core';
import { HelloWorldEntity } from './entities/hello-world.entity';
import { HelloWorldModule } from './ui-module/modules/hello-world.module';

export const HelloWorld: PluginConfig = {
  entities: [HelloWorldEntity],
  uiModules: [HelloWorldModule]
};

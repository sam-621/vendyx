import { UiModuleConfig } from '@ebloc/core';
import path from 'path';

export const HelloWorldUiModule: UiModuleConfig = {
  sidebarNavLink: {
    icon: 'home',
    label: 'Hello-world',
    slug: '/hello-world'
  },
  compiledUiModule: {
    path: path.join(process.cwd(), './plugins/hello-world/ui-module/dist'),
    rename: 'hello-world-module'
  }
};

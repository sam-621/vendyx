import { UiModuleConfig } from '@ebloc/core';
import path from 'path';

export const HelloWorldModule: UiModuleConfig = {
  sidebarNavLink: {
    icon: 'home',
    label: 'Hello-world',
    url: '/hello-world'
  },
  compiledUiModule: {
    path: path.join(process.cwd(), './ui-modules/hello-world/dist'),
    rename: 'hello-world'
  }
};

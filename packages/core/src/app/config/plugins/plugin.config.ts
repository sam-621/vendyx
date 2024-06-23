import { ModuleMetadata } from '@nestjs/common';

import { EBlocEntity } from '@/app/persistance';

export interface PluginConfig extends ModuleMetadata {
  entities?: EBlocEntity[];
  uiModules?: UiModuleConfig[];
}

export interface UiModuleConfig {
  sidebarNavLink: {
    url: string;
    label: string;
    icon: string;
  };
  compiledUiModule: {
    path: string;
    rename: string;
  };
}

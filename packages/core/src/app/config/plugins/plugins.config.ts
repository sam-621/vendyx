export interface PluginConfig {
  uiModules: UiModuleConfig[];
}

interface UiModuleConfig {
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

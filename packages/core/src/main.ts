import { NestFactory } from '@nestjs/core';
import { dest, series, src } from 'gulp';

import { GlobalExceptionFilter } from './api/common';
import { EblocConfig, getConfig, setConfig } from './config';
import { getPluginMetadata } from './plugin';
import { EBlocPluginMetadata, EBlocPluginMetadataKeys } from './plugin/ebloc.plugin';

/**
 * Copy gql schema files to dist folder
 * This is needed to make the schema file available for the reference in the graphql module
 */
function copySchemaToDistFolder() {
  src('./src/**/*.schema.gql').pipe(dest('./dist'));
}

export async function bootstrap(config: EblocConfig) {
  const newConfig = applyPluginsConfig(config);

  setConfig(newConfig);

  const { port } = getConfig().app;

  series(copySchemaToDistFolder)(() => console.log('Schema copied to dist folder'));

  // const { plugins } = getConfig();

  // copyUiModulesAndAdminUiToDistFolderInServerPackage(
  //   plugins
  //     .map(plugin => getPluginMetadata<UiModuleConfig>(EBlocPluginMetadataKeys.UI_MODULES, plugin))
  //     .filter(uiModules => uiModules)
  //     .flat()
  // );

  /**
   * We need to import the app module dynamically
   * because we need to be sure that config is already set
   * before AppModule decorator is evaluated.
   *
   * This avoid having a undefined config in the AppModule
   */
  const appModule = await import('./app.module.js');

  const app = await NestFactory.create(appModule.AppModule, {
    // TODO: Check this to do it the right way
    cors: true
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(port);
}

/**
 * Copy the compiled ui modules to the admin-ui folder of the server package
 * Also copy the admin-ui dist folder to the admin-ui folder of the server package
 */
// const copyUiModulesAndAdminUiToDistFolderInServerPackage = (
//   uiModules: EBlocPluginMetadata['uiModules']
// ) => {
//   uiModules?.forEach(uiModule => {
//     const { compiledUiModule } = uiModule ?? {};

//     src(path.join(compiledUiModule.path, '/**/*')).pipe(
//       dest(path.join(process.cwd(), `admin-ui/${compiledUiModule.rename}`))
//     );
//   });

//   src(path.join(__dirname, '../../admin-ui/dist/**/*')).pipe(
//     dest(path.join(process.cwd(), 'admin-ui/'))
//   );
// };

/**
 * Applies the plugins config functions to the initial config
 */
const applyPluginsConfig = (initialConfig: EblocConfig) => {
  const plugins = initialConfig.plugins;
  let newConfig = initialConfig;

  for (const plugin of plugins) {
    const configFn = getPluginMetadata<EBlocPluginMetadata['config']>(
      EBlocPluginMetadataKeys.CONFIG_FN,
      plugin
    );

    if (configFn) {
      newConfig = configFn(newConfig);
    }
  }

  return newConfig;
};

import { Query, Resolver } from '@nestjs/graphql';

import { getConfig } from '@/config';
import { EBlocPluginMetadataKeys, UiModuleConfig, getPluginMetadata } from '@/plugin';

@Resolver('AdminUiConfig')
export class AdminUiConfigResolver {
  @Query('adminUiConfig')
  adminUiConfig() {
    const { plugins } = getConfig();
    const { shipping } = getConfig();
    const { payments } = getConfig();

    const extraUiModules = plugins
      .map(p => getPluginMetadata<UiModuleConfig>(EBlocPluginMetadataKeys.UI_MODULES, p))
      .flat()
      .filter(uiModule => uiModule)
      .map(uiModule => ({
        id: uiModule.compiledUiModule.rename,
        ...uiModule.sidebarNavLink
      }));

    const priceCalculators = shipping.priceCalculators.map(pc => {
      const parsedArgs = Object.entries(pc.args).map(([key, value]) => {
        return {
          key,
          ...value
        };
      });

      return {
        code: pc.code,
        name: pc.name,
        args: parsedArgs
      };
    });

    const paymentHandlers = payments.handlers.map(h => ({ code: h.code, name: h.name }));

    const response = {
      extraUiModules,
      priceCalculators,
      paymentHandlers
    };

    return response;
  }
}

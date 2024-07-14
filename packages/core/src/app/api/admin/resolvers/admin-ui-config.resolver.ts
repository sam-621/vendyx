import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard } from '../../common';

import { getConfig } from '@/app/config';
import { EBlocPluginMetadataKeys, UiModuleConfig, getPluginMetadata } from '@/app/plugin';

@UseGuards(AdminJwtAuthGuard)
@Resolver('AdminUiConfig')
export class AdminUiConfigResolver {
  @Query('adminUiConfig')
  adminUiConfig() {
    const { adminUi } = getConfig();
    const { plugins } = getConfig();
    const {
      shipping: { priceCalculators }
    } = getConfig();

    const extraUiModules = plugins
      .map(p => getPluginMetadata<UiModuleConfig>(EBlocPluginMetadataKeys.UI_MODULES, p))
      .flat()
      .filter(uiModule => uiModule)
      .map(uiModule => ({
        id: uiModule.compiledUiModule.rename,
        ...uiModule.sidebarNavLink
      }));

    const response = {
      branding: adminUi.branding,
      extraUiModules: extraUiModules,
      priceCalculators: priceCalculators.map(pc => {
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
      })
    };

    return response;
  }
}

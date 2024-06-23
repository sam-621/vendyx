import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { getConfig } from '@/app/config';
import { EBlocPluginMetadataKeys, UiModuleConfig, getPluginMetadata } from '@/app/plugins';

@Controller('admin-ui-config')
export class AdminUiConfigController {
  @Get('')
  async getAdminUiConfig(@Res() res: Response) {
    const { adminUi } = getConfig();
    const { plugins } = getConfig();

    const extraUiModules = plugins
      .map(p => getPluginMetadata<UiModuleConfig>(EBlocPluginMetadataKeys.UI_MODULES, p))
      .flat()
      .map(uiModule => ({
        id: uiModule.compiledUiModule.rename,
        ...uiModule.sidebarNavLink
      }));

    const response = {
      branding: adminUi.branding,
      extraUiModules: extraUiModules
    };

    return res.status(200).json(response);
  }
}

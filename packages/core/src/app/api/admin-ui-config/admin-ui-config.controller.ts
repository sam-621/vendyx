import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { getConfig } from '@/app/config';

@Controller('admin-ui-config')
export class AdminUiConfigController {
  @Get('')
  async getAdminUiConfig(@Res() res: Response) {
    const { adminUi, plugins } = getConfig();

    const extraUiModules = plugins
      .map(p => p.uiModules)
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

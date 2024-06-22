import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { getConfig } from '@/app/config';

@Controller('admin-ui-config')
export class AdminUiConfigController {
  @Get('')
  async getAdminUiConfig(@Res() res: Response) {
    const { adminUi } = getConfig();

    return res.status(200).json(adminUi);
  }
}

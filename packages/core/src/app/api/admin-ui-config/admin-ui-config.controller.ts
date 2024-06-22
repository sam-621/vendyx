import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { getConfig } from '@/app/config';
import { AssetService } from '@/app/service';

@Controller('admin-ui-config')
export class AdminUiConfigController {
  constructor(private readonly assetService: AssetService) {}

  @Get('')
  async getAdminUiConfig(@Res() res: Response) {
    const { adminUi } = getConfig();

    return res.status(200).json(adminUi);
  }
}

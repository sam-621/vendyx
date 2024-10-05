import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ShopService } from '@/business/shop';

@Injectable()
export class ShopApiKeyGuard implements CanActivate {
  constructor(private readonly shopService: ShopService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;

    const shopId = req.headers.shop_id;
    const shopApiKey = req.headers.x_vendyx_shop_api_key;

    const isValidApiKey = await this.shopService.validateShopApiKey(shopId, shopApiKey);

    if (!isValidApiKey) {
      throw new UnauthorizedException('Invalid shop API key');
    }

    return isValidApiKey;
  }
}

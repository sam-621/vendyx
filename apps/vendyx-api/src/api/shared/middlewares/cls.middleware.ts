import { ClsMiddleware } from 'nestjs-cls';

import { AuthService } from '@/auth';
import { UserJwtPayload } from '@/auth/strategies';
import { CLS_OWNER_ID, CLS_SHOP_ID } from '@/persistence';

export const clsMiddleware = (authService: AuthService) => {
  return new ClsMiddleware({
    async setup(cls, req) {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const payload = await authService.decodeAccessToken<UserJwtPayload>(token);

      cls.set(CLS_SHOP_ID, req.headers.shop_id);
      cls.set(CLS_OWNER_ID, payload?.sub);
    }
  }).use;
};

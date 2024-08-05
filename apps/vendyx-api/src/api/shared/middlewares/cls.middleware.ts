import { ClsMiddleware } from 'nestjs-cls';

import { CLS_OWNER_ID, CLS_SHOP_ID } from '@/persistance';

export const clsMiddleware = new ClsMiddleware({
  async setup(cls, req) {
    cls.set(CLS_SHOP_ID, req.headers.shop_id);
    cls.set(CLS_OWNER_ID, req.headers.owner_id);
  }
}).use;

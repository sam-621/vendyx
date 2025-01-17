import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'nestjs-prisma';

import { CLS_OWNER_ID, CLS_SHOP_ID } from '../persistence.module';
import { modelHasDeletedAtProperty } from '../utils/model.utils';

/**
 * Extends the PrismaService to only return records related to the current shop and owner.
 */
export const PRISMA_FOR_SHOP = Symbol('PRISMA_FOR_SHOP');

export type PrismaForShop = ReturnType<typeof useFactory>;

const useFactory = (prisma: PrismaService, store: ClsService) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query, operation, model }) {
          const shopId = String(store.get(CLS_SHOP_ID) || '00000000-0000-0000-0000-000000000000');
          const ownerId = String(store.get(CLS_OWNER_ID) || '00000000-0000-0000-0000-000000000000');

          if (
            (operation === 'findUnique' ||
              operation === 'findFirst' ||
              operation === 'findMany' ||
              operation === 'count') &&
            modelHasDeletedAtProperty(model)
          ) {
            args.where = { deletedAt: null, ...args.where };
          }

          const [, , result] = await prisma.$transaction([
            prisma.$executeRaw`SELECT set_config('app.current_shop_id', ${`${shopId}`}, TRUE)`,
            prisma.$executeRaw`SELECT set_config('app.current_owner_id', ${`${ownerId}`}, TRUE)`,
            query(args)
          ]);

          return result;
        }
      }
    }
  });
};

export const PrismaForShopClientProvider = {
  provide: PRISMA_FOR_SHOP,
  inject: [PrismaService, ClsService],
  useFactory
};

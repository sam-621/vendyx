import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'nestjs-prisma';

const useFactory = (prisma: PrismaService, store: ClsService) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const shopId = String(store.get('shop_id') ?? '');
          const ownerId = String(store.get('owner_id') ?? '');

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

export type PrismaForShop = ReturnType<typeof useFactory>;

export const PRISMA_FOR_SHOP = Symbol('PRISMA_FOR_SHOP');

export const PrismaForShopClientProvider = {
  provide: PRISMA_FOR_SHOP,
  inject: [PrismaService, ClsService],
  useFactory
};

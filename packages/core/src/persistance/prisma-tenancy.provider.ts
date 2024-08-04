// prisma-tenancy.provider.ts
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { ClsService } from 'nestjs-cls';

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

export type ExtendedTenantClient = ReturnType<typeof useFactory>;

export const TENANCY_CLIENT_TOKEN = Symbol('TENANCY_CLIENT_TOKEN');

export const PrismaTenancyClientProvider = {
  provide: TENANCY_CLIENT_TOKEN,
  imports: [PrismaModule],
  inject: [PrismaService, ClsService],
  useFactory
};

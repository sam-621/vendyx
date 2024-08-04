import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'nestjs-prisma';

const useFactory = (prisma: PrismaService) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const [, , , result] = await prisma.$transaction([
            /**
             * This is a workarount to always have a valid uuid in the current_shop_id and current_owner_id since the empty string is not a valid UUID
             * The empty string occurs when this flow happens:
             *
             * 1. A PrismaForShop query is executed and the shop_id and owner_id are set
             * in PrismaForShop queries, as the IS_LOCAL param is set to true, the shop_id and owner_id are reset to empty strings at the end of the query.
             *
             * 2. A PrismaForAdmin query is executed and by now, the shop_id and owner_id are empty strings (because of the reset in step 1) so, the policy throw an error,
             * the policy is expecting a valid UUID in the current_shop_id and current_owner_id, not an empty string
             *
             * And for this reason, we are setting the current_shop_id and current_owner_id to a valid but dummy UUID in the PrismaForAdmin queries
             *
             * More info: https://github.com/prisma/prisma/issues/20407
             */
            prisma.$executeRaw`SELECT set_config('app.current_shop_id', '00000000-0000-0000-0000-000000000000', TRUE)`,
            prisma.$executeRaw`SELECT set_config('app.current_owner_id', '00000000-0000-0000-0000-000000000000', TRUE)`,
            prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
            query(args)
          ]);

          return result;
        }
      }
    }
  });
};

export type PrismaForAdmin = ReturnType<typeof useFactory>;

export const PRISMA_FOR_ADMIN = Symbol('PRISMA_FOR_ADMIN');

export const PrismaForAdminClientProvider = {
  provide: PRISMA_FOR_ADMIN,
  inject: [PrismaService, ClsService],
  useFactory
};

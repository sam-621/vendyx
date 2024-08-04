import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { PRISMA_FOR_ADMIN, PrismaForAdminClientProvider } from './prisma-for-admin.provider';
import { PRISMA_FOR_SHOP, PrismaForShopClientProvider } from './prisma-for-shop.provider';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaForShopClientProvider, PrismaForAdminClientProvider],
  exports: [PRISMA_FOR_SHOP, PRISMA_FOR_ADMIN]
})
export class PrismaVendyxModule {}

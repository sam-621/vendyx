// prisma-tenancy.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaForShopClientProvider, PRISMA_FOR_SHOP } from './prisma-tenancy.provider';
import { PrismaModule } from 'nestjs-prisma';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaForShopClientProvider],
  exports: [PRISMA_FOR_SHOP]
})
export class PrismaTenancyModule {}

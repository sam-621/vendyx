import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import {
  PRISMA_FOR_ADMIN,
  PRISMA_FOR_SHOP,
  PrismaForAdminClientProvider,
  PrismaForShopClientProvider
} from './prisma-clients';
import { UserRepository } from './repositories';

const REPOSITORIES = [UserRepository];

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaForShopClientProvider, PrismaForAdminClientProvider, ...REPOSITORIES],
  exports: [PRISMA_FOR_SHOP, PRISMA_FOR_ADMIN]
})
export class PersistanceModule {}

import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import {
  PRISMA_FOR_ADMIN,
  PrismaForAdminClientProvider
} from './prisma-clients/prisma-for-admin.provider';
import {
  PRISMA_FOR_SHOP,
  PrismaForShopClientProvider
} from './prisma-clients/prisma-for-shop.provider';
import { AssetRepository } from './repositories/asset.repository';
import { CountryRepository } from './repositories/country.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { OptionRepository } from './repositories/option.repository';
import { ProductRepository } from './repositories/product.repository';
import { ShopRepository } from './repositories/shop.repository';
import { UserRepository } from './repositories/user.repository';
import { VariantRepository } from './repositories/variant.repository';
import { ZoneRepository } from './repositories/zone.repository';

const REPOSITORIES = [
  UserRepository,
  ShopRepository,
  ProductRepository,
  VariantRepository,
  OptionRepository,
  AssetRepository,
  CountryRepository,
  ZoneRepository,
  CustomerRepository
];

export const CLS_SHOP_ID = 'shop_id';
export const CLS_OWNER_ID = 'owner_id';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaForShopClientProvider, PrismaForAdminClientProvider, ...REPOSITORIES],
  exports: [PRISMA_FOR_SHOP, PRISMA_FOR_ADMIN, ...REPOSITORIES]
})
export class PersistenceModule {}

import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth';
import { StorageModule } from '@/storage';

import { AssetService } from './asset';
import { OptionService } from './option';
import { ProductService } from './product';
import { ShopService } from './shop';
import { UserService } from './user';
import { VariantService } from './variant';

const SERVICES = [
  UserService,
  ShopService,
  ProductService,
  VariantService,
  OptionService,
  AssetService
];

@Module({
  imports: [AuthModule, StorageModule],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class BusinessModule {}

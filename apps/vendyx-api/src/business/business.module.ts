import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth';

import { OptionService } from './option';
import { ProductService } from './product';
import { ShopService } from './shop';
import { UserService } from './user';
import { VariantService } from './variant';

const SERVICES = [UserService, ShopService, ProductService, VariantService, OptionService];

@Module({
  imports: [AuthModule],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class BusinessModule {}

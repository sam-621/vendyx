import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth';

import { ProductService } from './product';
import { ShopService } from './shop';
import { UserService } from './user';
import { VariantService } from './variant';

const SERVICES = [UserService, ShopService, ProductService, VariantService];

@Module({
  imports: [AuthModule],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class BusinessModule {}

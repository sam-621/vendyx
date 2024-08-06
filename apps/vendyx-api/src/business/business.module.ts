import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth';

import { ProductService } from './product';
import { ShopService } from './shop';
import { UserService } from './user';

@Module({
  imports: [AuthModule],
  providers: [UserService, ShopService, ProductService],
  exports: [UserService, ShopService, ProductService]
})
export class BusinessModule {}

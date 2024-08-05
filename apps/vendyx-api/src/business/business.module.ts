import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth';

import { ShopService } from './shop';
import { UserService } from './user';

@Module({
  imports: [AuthModule],
  providers: [UserService, ShopService],
  exports: [UserService, ShopService]
})
export class BusinessModule {}

import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth';

import { UserService } from './user';

@Module({
  imports: [AuthModule],
  providers: [UserService],
  exports: [UserService]
})
export class BusinessModule {}

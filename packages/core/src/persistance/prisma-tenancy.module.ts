// prisma-tenancy.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaTenancyClientProvider, TENANCY_CLIENT_TOKEN } from './prisma-tenancy.provider';
import { PrismaModule } from 'nestjs-prisma';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaTenancyClientProvider],
  exports: [TENANCY_CLIENT_TOKEN]
})
export class PrismaTenancyModule {}

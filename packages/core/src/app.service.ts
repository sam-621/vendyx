import { Inject, Injectable } from '@nestjs/common';
import { ExtendedTenantClient, TENANCY_CLIENT_TOKEN } from './persistance/prisma-tenancy.provider';

@Injectable()
export class AppService {
  constructor(@Inject(TENANCY_CLIENT_TOKEN) private readonly prisma: ExtendedTenantClient) {}

  async getHello() {
    const result = await this.prisma.user.findMany({
      include: { shops: true }
    });
    return result;
  }
}

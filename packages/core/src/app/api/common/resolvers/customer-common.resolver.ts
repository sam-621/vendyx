import { Args, Query, Resolver } from '@nestjs/graphql';

import { CustomerService } from '@/app/service';

@Resolver('Customer')
export class CustomerCommonResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query('customer')
  async customer(@Args('accessToken') accessToken: string) {
    return await this.customerService.findByAccessToken(accessToken);
  }
}

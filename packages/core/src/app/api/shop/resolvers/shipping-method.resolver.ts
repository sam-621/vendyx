import { Query, Resolver } from '@nestjs/graphql';

import { ShippingMethodService } from '@/app/service';

@Resolver('ShippingMethod')
export class ShippingMethodResolver {
  constructor(private readonly shippingMethodService: ShippingMethodService) {}

  @Query('availableShippingMethods')
  async availableShippingMethods() {
    const shippingMethods = await this.shippingMethodService.find();

    return shippingMethods;
  }
}

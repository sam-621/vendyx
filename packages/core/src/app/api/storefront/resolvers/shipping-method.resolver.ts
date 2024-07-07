import { Args, Query, Resolver } from '@nestjs/graphql';

import { ID } from '@/app/persistance';
import { ShippingMethodService } from '@/app/service';

@Resolver('ShippingMethod')
export class ShippingMethodResolver {
  constructor(private readonly shippingMethodService: ShippingMethodService) {}

  @Query('availableShippingMethods')
  async availableShippingMethods(@Args('orderId') orderId: ID) {
    const shippingMethods = await this.shippingMethodService.findAvailable(orderId);

    return shippingMethods;
  }
}

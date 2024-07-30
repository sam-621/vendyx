import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OrderLineEntity } from '@/persistance';
import { OrderService } from '@/business';

@Resolver('OrderLine')
export class OrderLineCommonResolver {
  constructor(private readonly orderService: OrderService) {}

  @ResolveField('productVariant')
  async lines(@Parent() line: OrderLineEntity) {
    const variant = await this.orderService.findVariantInLine(line.id);

    return variant;
  }
}

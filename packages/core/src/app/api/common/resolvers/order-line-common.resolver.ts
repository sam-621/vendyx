import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OrderLineEntity } from '@/app/persistance';
import { OrderService } from '@/app/service';

@Resolver('OrderLine')
export class OrderLineCommonResolver {
  constructor(private readonly orderService: OrderService) {}

  @ResolveField('productVariant')
  async lines(@Parent() line: OrderLineEntity) {
    const variant = await this.orderService.findVariantInLine(line.id);

    return variant;
  }
}

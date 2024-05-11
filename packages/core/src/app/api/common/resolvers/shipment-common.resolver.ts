import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ShipmentEntity } from '@/app/persistance';
import { ShipmentService } from '@/app/service';

@Resolver('Shipment')
export class ShipmentCommonResolver {
  constructor(private readonly shipmentService: ShipmentService) {}

  @ResolveField('method')
  async method(@Parent() payment: ShipmentEntity) {
    const method = await this.shipmentService.findMethod(payment.id);

    return method;
  }
}

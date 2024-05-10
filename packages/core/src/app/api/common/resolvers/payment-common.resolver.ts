import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PaymentEntity } from '@/app/persistance';
import { PaymentService } from '@/app/service';

@Resolver('Payment')
export class PaymentCommonResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @ResolveField('method')
  async method(@Parent() payment: PaymentEntity) {
    const method = await this.paymentService.findMethod(payment.id);

    return method;
  }
}

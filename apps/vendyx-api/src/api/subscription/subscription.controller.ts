import { Controller, Post } from '@nestjs/common';

@Controller('/subscription')
export class SubscriptionController {
  @Post('/create-checkout-session')
  createCheckoutSession() {
    return 'Subscription created';
  }
}

import { Body, Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';

import { SubscriptionService } from '@/business/subscription';

import { CheckoutWithStripeInput } from './subscription-api.types';

@Controller('/subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/create-checkout-session')
  createCheckoutSession(@Body() input: CheckoutWithStripeInput) {
    return this.subscriptionService.checkoutWithStripe(input);
  }

  // @Post('/create-portal-session')
  // createPortalSession(@Body() input: { sessionId: string }) {
  //   // return this.subscriptionService.createPortalSession(input);
  //   return { data: '' };
  // }

  @Post('/webhook')
  webhook(@Req() req: RawBodyRequest<Request>, @Headers() headers: any) {
    return this.subscriptionService.webhook(req.rawBody, headers['stripe-signature']);
  }
}

import { Body, Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';

import { SubscriptionService } from '@/business/subscription';

@Controller('/subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/create-checkout-session')
  createCheckoutSession(@Body() input: { lookupKey: string }) {
    return this.subscriptionService.createCheckoutSession(input);
  }

  @Post('/create-portal-session')
  createPortalSession(@Body() input: { sessionId: string }) {
    return this.subscriptionService.createPortalSession(input);
  }

  @Post('/webhook')
  webhook(@Req() req: RawBodyRequest<Request>, @Headers() headers: any) {
    return this.subscriptionService.webhook(req.rawBody, headers['stripe-signature']);
  }
}

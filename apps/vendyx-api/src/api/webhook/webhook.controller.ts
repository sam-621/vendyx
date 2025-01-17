import { Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';

import { SubscriptionService } from '@/business/subscription/subscription.service';

@Controller('/subscription')
export class WebhookController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/stripe-webhook')
  webhook(@Req() req: RawBodyRequest<Request>, @Headers() headers: any) {
    return this.subscriptionService.webhook(req.rawBody, headers['stripe-signature']);
  }
}

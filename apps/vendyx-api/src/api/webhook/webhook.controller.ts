import { Controller, Headers, Logger, Post, RawBodyRequest, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { SubscriptionService } from '@/business/subscription/subscription.service';

@Controller('/webhook')
export class WebhookController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/subscription')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers() headers: any,
    @Res() res: Response
  ) {
    try {
      await this.subscriptionService.webhook(req.rawBody, headers['stripe-signature']);
    } catch (error) {
      Logger.error({
        type: 'WEBHOOK_ERROR',
        path: '/webhook/subscription',
        message: error.message,
        raw: error
      });
    } finally {
      res.status(200).send();
    }
  }
}

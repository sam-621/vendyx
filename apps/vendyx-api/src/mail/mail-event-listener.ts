import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { OrderEvent, OrderPaidEvent } from '@/event-bus/events';

import { MailService } from './mail.service';

@Injectable()
export class MailEventListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(OrderEvent.PAID)
  async handleOrderPaidEvent1(payload: OrderPaidEvent) {
    await this.mailService.sendOrderConfirmationEmail(payload.orderId);
  }
}

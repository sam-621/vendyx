import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { OrderEvent, OrderPaidEvent } from '@/event-bus/events';

import { MailOrderService } from './mail-order.service';

@Injectable()
export class MailOrderListener {
  constructor(private readonly mailOrderService: MailOrderService) {}

  @OnEvent(OrderEvent.PAID)
  async handleOrderPaidEvent(payload: OrderPaidEvent) {
    try {
      await this.mailOrderService.sendOrderConfirmationEmail(payload.orderId);
    } catch (error) {}
  }
}

import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  CustomerEvent,
  CustomerRegisteredEvent,
  OrderEvent,
  OrderPaidEvent
} from '@/event-bus/events';

import { MailService } from './mail.service';

@Injectable()
export class MailEventListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(OrderEvent.PAID)
  async handleOrderPaidEvent(payload: OrderPaidEvent) {
    await this.mailService.sendOrderConfirmationEmail(payload.orderId);
  }

  @OnEvent(CustomerEvent.REGISTERED)
  async handleCustomerRegisteredEvent(payload: CustomerRegisteredEvent) {
    await this.mailService.sendCustomerRegisteredEmail(payload.customerId);
  }
}

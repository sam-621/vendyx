import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CustomerEvent, CustomerRegisteredEvent } from '@/event-bus/events';

import { MailCustomerService } from './mail-customer.service';

@Injectable()
export class MailCustomerListener {
  constructor(private readonly mailCustomerService: MailCustomerService) {}

  @OnEvent(CustomerEvent.REGISTERED)
  async handleCustomerRegisteredEvent(payload: CustomerRegisteredEvent) {
    try {
      await this.mailCustomerService.sendCustomerRegisteredEmail(payload.customerId);
    } catch (error) {}
  }
}

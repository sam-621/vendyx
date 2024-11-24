import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserEvent, UserRegisteredEvent } from '@/event-bus/events';

import { MailUserService } from './mail-user.service';

@Injectable()
export class MailUserListener {
  constructor(private readonly mailUserService: MailUserService) {}

  @OnEvent(UserEvent.REGISTERED)
  async handleCustomerRegisteredEvent(payload: UserRegisteredEvent) {
    try {
      await this.mailUserService.sendConfirmEmail(payload);
    } catch (error) {}
  }
}

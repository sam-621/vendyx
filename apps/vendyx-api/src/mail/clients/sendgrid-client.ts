import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

import { MailClient, MailClientSendInput } from './mail-client.interface';

@Injectable()
export class SendGridClient implements MailClient {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(configService.get('SENDGRID_API_KEY') ?? '');
  }
  async send(input: MailClientSendInput): Promise<void> {
    try {
      await SendGrid.send(input);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

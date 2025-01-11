import { Injectable, Logger } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

import { ConfigService } from '@/config/config.service';

import { MailClient, MailClientSendInput } from './mail-client.interface';
import { MailError } from '../mail.error';

@Injectable()
export class SendGridClient implements MailClient {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(configService.get('SENDGRID.API_KEY') ?? '');
  }
  async send(input: MailClientSendInput): Promise<void> {
    try {
      await SendGrid.send(input);
      Logger.log(`Email "${input.subject}" successfully sent to ${input.to}`);
    } catch (error) {
      throw new MailError(
        `Failed email "${input.subject}" send to ${input.to}`,
        input.to,
        input.subject,
        error
      );
    }
  }
}

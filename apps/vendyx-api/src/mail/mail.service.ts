import { Injectable } from '@nestjs/common';

import { MailClientSendInput, SendGridClient } from './clients';
import { emailHtml } from './templates';

@Injectable()
export class MailService {
  constructor(private readonly sendGridClient: SendGridClient) {}

  async sendTestEmail(recipient: string): Promise<void> {
    const html = await emailHtml('https://google.com');

    const mail: MailClientSendInput = {
      to: recipient,
      from: 'vendyxmail@gmail.com',
      subject: 'Test email',
      html
    };
    await this.sendGridClient.send(mail);
  }
}

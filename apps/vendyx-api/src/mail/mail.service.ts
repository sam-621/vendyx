import { Injectable } from '@nestjs/common';

import { MailClientSendInput, SendGridClient } from './clients';
import { orderConfirmationTemplate } from './templates';

@Injectable()
export class MailService {
  constructor(private readonly sendGridClient: SendGridClient) {}

  async sendTestEmail(recipient: string): Promise<void> {
    const html = await orderConfirmationTemplate;

    const mail: MailClientSendInput = {
      to: recipient,
      from: { email: 'vendyxmail@gmail.com', name: 'Vendyx' },
      subject: 'Test email',
      html
    };
    await this.sendGridClient.send(mail);
  }
}

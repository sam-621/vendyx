import { Inject, Injectable } from '@nestjs/common';

import { MailClientSendInput } from '@/mail/clients/mail-client.interface';
import { SendGridClient } from '@/mail/clients/sendgrid-client';
import { MailError } from '@/mail/mail.error';
import { EmailTemplates } from '@/mail/templates';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

@Injectable()
export class MailCustomerService {
  constructor(
    private readonly sendGridClient: SendGridClient,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  async sendCustomerRegisteredEmail(customerId: ID): Promise<void> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: { shop: true }
    });

    if (!customer) {
      throw new MailError(`Customer not found for customer id: ${customerId}`);
    }

    const html = await EmailTemplates.CustomerRegistered({ customer, shop: customer.shop });

    const mail: MailClientSendInput = {
      to: customer.email,
      from: { email: 'vendyxmail@gmail.com', name: customer.shop.name },
      subject: `Welcome to ${customer.shop.name}`,
      html
    };

    await this.sendGridClient.send(mail);
  }
}

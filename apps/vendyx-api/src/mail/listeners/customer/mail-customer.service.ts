import { Inject, Injectable } from '@nestjs/common';

import { MailClientSendInput, SendGridClient } from '@/mail/clients';
import { MailError } from '@/mail/mail.error';
import { EmailTemplates } from '@/mail/templates';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistence/prisma-clients';
import { ID } from '@/persistence/types';

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

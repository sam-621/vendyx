import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserService } from '@/business/user/user.service';
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
export class MailUserService {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly sendGridClient: SendGridClient,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async sendConfirmEmail(input: SendConfirmEmailInput) {
    const domain = this.configService.get<string>('VENDYX_ADMIN_DOMAIN') ?? '';
    const otp = await this.userService.generateOtp(input.id);

    if (!otp) {
      throw new MailError(`Failed to generate OTP for user ${input.email}`);
    }

    const html = await EmailTemplates.ConfirmEmail({ domain, otp });

    const mail: MailClientSendInput = {
      to: input.email,
      from: { email: 'vendyxmail@gmail.com', name: 'Vendyx' },
      subject: `Confirm email`,
      html
    };

    return this.sendGridClient.send(mail);
  }
}

type SendConfirmEmailInput = {
  id: ID;
  email: string;
};

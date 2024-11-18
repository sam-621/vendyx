import { Logger } from '@nestjs/common';

export class MailError {
  constructor(
    public message: string,
    public to?: string,
    public subject?: string,
    public raw?: any
  ) {
    Logger.error({
      type: 'MAIL_ERROR',
      to,
      subject,
      message
    });
  }
}

/**
 * Email client interface
 */
export interface MailClient {
  /**
   * Send email
   */
  send(input: MailClientSendInput): Promise<boolean>;
}

export type MailClientSendInput = {
  from: { email: string; name: string };
  to: string;
  subject: string;
  html: string;
};

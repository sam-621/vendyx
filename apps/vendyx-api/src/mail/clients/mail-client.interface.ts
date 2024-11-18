/**
 * Email client interface
 */
export interface MailClient {
  /**
   * Send email
   */
  send(input: MailClientSendInput): Promise<void>;
}

export type MailClientSendInput = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

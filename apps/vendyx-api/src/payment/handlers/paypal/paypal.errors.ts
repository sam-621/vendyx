import { PaypalErrorCode } from '@/api/shared';
import { ErrorResult } from '@/business/shared';

export class PaypalError extends ErrorResult<PaypalErrorCode> {
  constructor(cause: any) {
    super(PaypalErrorCode.PAYPAL_ERROR, "Couldn't create paypal order", cause);
  }
}

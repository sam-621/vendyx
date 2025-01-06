import { PaypalErrorCode } from '@/api/shared/types/gql.types';
import { ErrorResult } from '@/business/shared/utils/error-result.utils';

export class PaypalError extends ErrorResult<PaypalErrorCode> {
  constructor(cause: any) {
    super(PaypalErrorCode.PAYPAL_ERROR, "Couldn't create paypal order", cause);
  }
}

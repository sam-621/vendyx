import { PaymentMethodErrorCode } from '@/api/shared';

import { ErrorResult } from '../shared';

export class HandlerAlreadySelected extends ErrorResult<PaymentMethodErrorCode> {
  constructor() {
    super(
      PaymentMethodErrorCode.HANDLER_ALREADY_SELECTED,
      'Payment handler is already present in another payment method'
    );
  }
}

export class HandlerNotFound extends ErrorResult<PaymentMethodErrorCode> {
  constructor() {
    super(PaymentMethodErrorCode.HANDLER_NOT_FOUND, 'Payment handler not found');
  }
}

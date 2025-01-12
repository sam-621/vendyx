import { PaymentMethodErrorCode } from '@/api/shared/types/gql.types';

import { ErrorResult } from '../shared/utils/error-result.utils';

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

export class FailedToSaveArgs extends ErrorResult<PaymentMethodErrorCode> {
  constructor() {
    super(PaymentMethodErrorCode.FAILED_TO_SAVE_ARGS, 'Failed to save payment handler arguments');
  }
}

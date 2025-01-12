import { ShippingMethodErrorCode } from '@/api/shared/types/gql.types';

import { ErrorResult } from '../shared/utils/error-result.utils';

export class HandlerNotFound extends ErrorResult<ShippingMethodErrorCode> {
  constructor() {
    super(ShippingMethodErrorCode.HANDLER_NOT_FOUND, 'Shipment handler not found');
  }
}

export class FailedToSaveArgs extends ErrorResult<ShippingMethodErrorCode> {
  constructor() {
    super(ShippingMethodErrorCode.FAILED_TO_SAVE_ARGS, 'Failed to save handler args');
  }
}

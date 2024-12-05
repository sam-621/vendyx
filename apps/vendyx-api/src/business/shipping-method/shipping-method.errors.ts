import { ShippingMethodErrorCode } from '@/api/shared';

import { ErrorResult } from '../shared';

export class HandlerNotFound extends ErrorResult<ShippingMethodErrorCode> {
  constructor() {
    super(ShippingMethodErrorCode.HANDLER_NOT_FOUND, 'Shipment handler not found');
  }
}

import { ShippingMethodErrorCode } from '@/api/shared/types/gql.types';

import { ErrorResult } from '../shared/utils/error-result.utils';

export class HandlerNotFound extends ErrorResult<ShippingMethodErrorCode> {
  constructor() {
    super(ShippingMethodErrorCode.HANDLER_NOT_FOUND, 'Shipment handler not found');
  }
}

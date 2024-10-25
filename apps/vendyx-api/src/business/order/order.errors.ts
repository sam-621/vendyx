import { OrderState } from '@prisma/client';

import { OrderErrorCode } from '@/api/shared';

import { ErrorResult } from '../shared';

/**
 * Error thrown when trying to transition an order to an invalid state
 */
export class OrderTransitionError extends ErrorResult<OrderErrorCode> {
  constructor(reason: string) {
    super(OrderErrorCode.ORDER_TRANSITION_ERROR, reason);
  }
}

/**
 * Error thrown when trying to perform an action on an order with an invalid state
 */
export class ForbidenOrderAction extends ErrorResult<OrderErrorCode> {
  constructor(state: OrderState) {
    super(OrderErrorCode.FORBIDDEN_ORDER_ACTION, `Forbidden action on order with state ${state}`);
  }
}

/**
 * Error thrown when trying to add a variant to an order with not enough stock
 */
export class NotEnoughStock extends ErrorResult<OrderErrorCode> {
  constructor() {
    super(OrderErrorCode.NOT_ENOUGH_STOCK, 'Not enough stock');
  }
}

/**
 * Error thrown when trying to add a customer to an order with an invalid email
 */
export class CustomerInvalidEmail extends ErrorResult<OrderErrorCode> {
  constructor() {
    super(OrderErrorCode.CUSTOMER_INVALID_EMAIL, 'Invalid email');
  }
}

/**
 * Error thrown when trying to add a disabled customer to an order
 */
export class CustomerDisabled extends ErrorResult<OrderErrorCode> {
  constructor() {
    super(OrderErrorCode.CUSTOMER_DISABLED, 'Customer is disabled');
  }
}

/**
 * Error thrown when trying to add a shipment to an order with a missing shipping address
 */
export class MissingShippingAddress extends ErrorResult<OrderErrorCode> {
  constructor() {
    super(OrderErrorCode.MISSING_SHIPPING_ADDRESS, 'Missing shipping address');
  }
}

/**
 * Error thrown when trying to add a shipment to an order and the shipping method id provided does not exist
 */
export class ShippingMethodNotFound extends ErrorResult<OrderErrorCode> {
  constructor() {
    super(OrderErrorCode.SHIPPING_METHOD_NOT_FOUND, 'Shipping method not found');
  }
}

export class PaymentMethodNotFound extends ErrorResult<OrderErrorCode> {
  constructor() {
    super(OrderErrorCode.PAYMENT_METHOD_NOT_FOUND, 'Payment method not found');
  }
}

export class PaymentFailed extends ErrorResult<OrderErrorCode> {
  constructor() {
    super(OrderErrorCode.PAYMENT_FAILED, 'An unexpected error occurred in the payment handler');
  }
}

export class PaymentDeclined extends ErrorResult<OrderErrorCode> {
  constructor(reason: string, rawError: any) {
    super(OrderErrorCode.PAYMENT_DECLINED, reason, rawError);
  }
}
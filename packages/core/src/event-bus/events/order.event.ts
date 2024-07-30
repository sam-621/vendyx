import { EBlocEvent } from './ebloc.event';

import { ID } from '@/persistance';

export enum OrderEvent {
  PAID = 'order.paid',
  SHIPPED = 'order.shipped',
  DELIVERED = 'order.delivered',
  CANCELLED = 'order.cancelled'
}

/**
 * @description
 * Event emitted when has been added a payment to an order.
 */
export class OrderPaidEvent extends EBlocEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.PAID);
  }
}

/**
 * @description
 * Event emitted when an order has been marked as shipped
 */
export class OrderShippedEvent extends EBlocEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.SHIPPED);
  }
}

/**
 * @description
 * Event emitted when an order has been marked as delivered
 */
export class OrderDeliveredEvent extends EBlocEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.DELIVERED);
  }
}

/**
 * @description
 * Event emitted when an order has been cancelled
 */
export class OrderCancelledEvent extends EBlocEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.CANCELLED);
  }
}

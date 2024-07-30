import { EBlocEvent } from './ebloc.event';

import { ID } from '@/persistance';

export enum CustomerEvent {
  REGISTERED = 'customer.registered'
}

/**
 * @description
 * Event that is emitted when a customer is registered via `createUser` mutation
 */
export class CustomerRegisteredEvent extends EBlocEvent {
  constructor(public readonly customerId: ID) {
    super(CustomerEvent.REGISTERED);
  }
}

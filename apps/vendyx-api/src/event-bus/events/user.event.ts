import { ID } from '@/persistence/types';

import { VendyxEvent } from './vendyx.event';

export enum UserEvent {
  REGISTERED = 'user.registered'
}

/**
 * @description
 * Event that is emitted when a user is registered
 */
export class UserRegisteredEvent extends VendyxEvent {
  id: ID;
  email: string;

  constructor(input: UserRegisteredEventInput) {
    super(UserEvent.REGISTERED);

    this.id = input.id;
    this.email = input.email;
  }
}

type UserRegisteredEventInput = {
  id: ID;
  email: string;
};

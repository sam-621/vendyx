import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { VendyxEvent } from './events/vendyx.event';

@Injectable()
export class EventBusService {
  constructor(private eventEmitter: EventEmitter2) {}

  emit<Event extends VendyxEvent>(event: Event): void {
    this.eventEmitter.emit(event.type, event);
  }
}

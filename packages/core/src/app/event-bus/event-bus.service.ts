import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EBlocEvent } from './events';

@Injectable()
export class EventBusService {
  constructor(private eventEmitter: EventEmitter2) {}

  emit<Event extends EBlocEvent>(event: Event): void {
    this.eventEmitter.emit(event.type, event);
  }
}

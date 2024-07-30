import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EventBusService } from './event-bus.service';
import { EventService } from './event.service';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [EventService, EventBusService],
  exports: [EventBusService]
})
export class EventBusModule {}

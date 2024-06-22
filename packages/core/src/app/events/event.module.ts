import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EventService } from './event.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [EventService]
})
export class EventModule {}

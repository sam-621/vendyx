import { TypeOrmModule } from '@nestjs/typeorm';

import { HelloWorldController } from './mock.controller';
import { HelloWorldEntity } from './mock.entity';

import { EBlocPlugin } from '@/app/plugin';

@EBlocPlugin({
  entities: [HelloWorldEntity],
  imports: [TypeOrmModule.forFeature([HelloWorldEntity])],
  controllers: [HelloWorldController]
})
export class MockPlugin {}

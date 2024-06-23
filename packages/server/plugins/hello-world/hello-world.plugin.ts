import { EBlocPlugin } from '@ebloc/core';
import { HelloWorldEntity } from './entities/hello-world.entity';
import { HelloWorldUiModule } from './ui-module/module/hello-world.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@EBlocPlugin({
  entities: [HelloWorldEntity],
  uiModules: [HelloWorldUiModule],
  imports: [TypeOrmModule.forFeature([HelloWorldEntity])]
})
export class HelloWorldPlugin {}

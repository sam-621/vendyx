import * as path from 'path';
import { EBlocPlugin } from '@ebloc/core';
import { HelloWorldEntity } from './entities/hello-world.entity';
import { HelloWorldUiModule } from './ui-module/module/hello-world.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloWorldController } from './controller/hello-world.controller';
import { HelloWorldResolver } from './resolvers/hello-world.resolver';
import { HelloWorldResolverAdmin } from './resolvers/hello-world-admin.resolver';

@EBlocPlugin({
  entities: [HelloWorldEntity],
  imports: [TypeOrmModule.forFeature([HelloWorldEntity])],
  controllers: [HelloWorldController],
  storefrontApiExtensions: {
    typePaths: [path.join(process.cwd(), './plugins/hello-world/gql/**/*.schema.gql')],
    resolvers: [HelloWorldResolver]
  },
  adminApiExtensions: {
    typePaths: [path.join(process.cwd(), './plugins/hello-world/gql/**/*.schema.gql')],
    resolvers: [HelloWorldResolverAdmin]
  }
})
export class HelloWorldPlugin {}

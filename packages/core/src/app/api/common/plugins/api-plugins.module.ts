import { Module } from '@nestjs/common';

import { GqlLoggingPlugin } from './gql-logging.plugin';

@Module({
  providers: [GqlLoggingPlugin]
})
export class ApiPluginsModule {}

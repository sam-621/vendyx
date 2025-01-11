import { Global, Module } from '@nestjs/common';
import { ConfigModule as NConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';
import { loadEnvironment } from './environment';
import { environmentValidator } from './environment-validator';

@Global()
@Module({
  imports: [
    NConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvironment],
      validate: environmentValidator,
      envFilePath: ['.env']
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}

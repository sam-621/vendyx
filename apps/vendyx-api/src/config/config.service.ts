import { Injectable } from '@nestjs/common';
import { ConfigService as NConfigService } from '@nestjs/config';

import { Environment, LeafTypes, Leaves } from './config.types';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NConfigService) {}

  get<T extends Leaves<Environment>>(key: T): LeafTypes<Environment, T> {
    return this.configService.get(key) as LeafTypes<Environment, T>;
  }
}

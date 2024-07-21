import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { getConfig } from './config';
import { Injector } from './injector';

@Module({})
export class ConfigModule implements OnApplicationBootstrap {
  constructor(private moduleRef: ModuleRef) {}

  onApplicationBootstrap() {
    this.initInjectableOperations();
  }

  private initInjectableOperations() {
    const injectableOperations = this.getInjectableOperations();
    const injector = new Injector(this.moduleRef);

    for (const operation of injectableOperations) {
      if (operation.init) {
        operation.init(injector);
      }
    }
  }

  private getInjectableOperations() {
    const { assets } = getConfig();
    const { payments } = getConfig();
    const { shipping } = getConfig();

    return [assets.storageProvider, ...payments.handlers, ...shipping.priceCalculators];
  }
}

import { Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

/**
 * Injector
 *
 * @description
 * Wrapper around the module ref to get instances of other providers in the application.
 * This class should be used when you need to get instances of other providers in plain js classes.
 */
export class Injector {
  constructor(private moduleRef: ModuleRef) {}

  /**
   * Get an instance of a provider
   */
  get<T, R = T>(provider: string | symbol | typeof Function | Type<any>): R {
    return this.moduleRef.get(provider, { strict: false }); // strict: false to get provider from all application modules
  }
}

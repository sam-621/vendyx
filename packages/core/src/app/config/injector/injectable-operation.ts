import { Injector } from './injector';

/**
 * Injectable operation
 *
 * @description
 * An injectable operation is a plain js class that run some business logic like payment handlers,
 * price calculators, storage providers, etc.
 * This interface is used to mark a plain js class as an injectable operation, which can run
 * some initialization code when the application is bootstrapped.
 */
export interface InjectableOperation {
  /**
   * @description
   * Run some logic when the application is bootstrapped. Receives the module ref as an argument,
   * which can be used to get instances of other or providers.
   *
   * ```ts
   * async init(injector: ModuleRef) {
   *   const service = injector.get(Service);
   *   service.doSomething();
   * }
   * ```
   */
  init?(injector: Injector): Promise<void>;
}

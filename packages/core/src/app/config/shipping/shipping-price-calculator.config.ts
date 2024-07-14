import { Args } from '../common/args.config';

import { OrderEntity } from '@/app/persistance';

export interface ShippingPriceCalculatorConfig {
  /**
   * @description
   * This is used to display the calculator name to the administrator.
   *
   * @example
   * ```ts
   * name: 'Country shipping calculator'
   * ```
   */
  name: string;

  /**
   * @description
   * This is used to identify the calculator and should be unique.
   *
   * @example
   * ```ts
   * code: 'country-shipping-calculator'
   * ```
   */
  code: string;

  /**
   * @description
   * This is used to display inputs in the admin UI and get their values, then these values are passed to the calculator.
   * This could be useful for an specific shipping calculator that needs some external configuration like a shipping calculator based on a static price.
   */
  args: Args;

  calculatePrice(order: OrderEntity, args: Record<string, string>): Promise<number>;
}

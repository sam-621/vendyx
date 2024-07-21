import { Args } from '../common/args.config';
import { InjectableOperation } from '../injector';

import { OrderEntity } from '@/app/persistance';

export interface ShippingPriceCalculatorConfig extends InjectableOperation {
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

  /**
   * Method to calculate the price of the shipping method. This method is called when the user is in the checkout process.
   *
   * @warning The price returned should not be formatted should be the raw price.
   */
  calculatePrice(order: OrderEntity, args: Record<string, string>): Promise<number>;

  /**
   * Method to get the preview price in the admin UI.
   *
   * @description
   * - If returned number is greater than 0, the preview price will be `Price: ${returnedValue}`.
   * - If returned number is 0, the preview price will be `Free`.
   * - If returned number is less than 0, the preview price will be `Dynamic`. (This is used for shipping calculators that get the price from an external service).
   *
   * @warning If any arg is price type it will be received as an integer
   */
  getPricePreview(args: Record<string, string>): number;
}

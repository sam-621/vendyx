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

  calculatePrice(order: OrderEntity): Promise<number>;
}

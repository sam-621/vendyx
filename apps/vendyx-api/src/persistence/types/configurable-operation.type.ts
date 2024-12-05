import { Args } from './args.type';

export abstract class ConfigurableOperation {
  /**
   * @description
   * This is used to display the operation name to the administrator.
   * The name is not arbitrary, it's up to you to choose a name that makes sense for your provider.
   *
   * @example
   * ```ts
   * // for payment handler
   * name: 'Stripe'
   *
   * // for price calculator
   * name: 'Flat rate'
   * ```
   */
  name: string;

  /**
   * @description
   * This is used to identify the provider and should be unique. it's mainly used in admin ui but also it can be used in the storefront,
   * for example, when displaying the payment methods to the customer in the checkout page you may want to know which provider is used by every payment method,
   * so you can display the provider logo, or know which provider sdk to load, etc.
   *
   * @example
   * ```ts
   * // for payment handler
   * code: 'stripe'
   *
   * // for price calculator
   * code: 'flat-rate'
   * ```
   *
   * @waring this code is sent to your storefront.
   */
  code: string;

  /**
   * @description
   * Ui configuration for the provider, this is used to display ui elements in the admin ui.
   */
  ui: ConfigurableOperationUi;

  /**
   * @description
   * This is used to display inputs in the admin UI and get their values, then these values are passed to the entity.
   * This could be useful for an specific operations that needs some external configuration.
   */
  args: Args;
}

export type ConfigurableProperty = {
  code: string;
  args: Record<string, string | number | boolean>;
};

export type ConfigurableOperationUi =
  | undefined
  | {
      icon: string;
    };

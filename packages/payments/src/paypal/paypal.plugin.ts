import { EBlocPlugin } from '@ebloc/core';
import * as path from 'path';
import { PaypalResolver } from './paypal.resolver';
import { PaypalService } from './paypal.service';
import { PAYPAL_PLUGIN_CONFIG } from './paypal.constants';
import { PaypalPaymentHandler } from './paypal.handler';

/**
 * Paypal plugin
 *
 * @description
 * Plugin to integrate [Paypal](https://paypal.com) into ebloc
 *
 * ### Requirements
 * 1. Set Up a PayPal Business Account
 * 2. Create a PayPal App in the [PayPal Developer Dashboard](https://developer.paypal.com)
 * 3. Get your PayPal Client ID and Secret
 *
 * ### Admin UI usage
 * 1. Add plugin to your ebloc config `plugins` array
 * ```ts
 * // ...
 * plugins: [
 *   PaypalPlugin.init({
 *     clientId: 'YOUR_PAYPAL_CLIENT_ID',
 *     secret: 'YOUR_PAYPAL_SECRET',
 *     devMode: false // Set to true if you want to use paypal in sandbox mode
 *   })
 * ]
 * ```
 *
 * 2. Create a new Payment method in the admin ui and select Paypal as the handler.
 *
 * ### Storefront usage
 *
 * This plugin is designed to work with the [Standard Checkout](https://developer.paypal.com/studio/checkout/standard) flow.
 *
 * 1. Add `createPaypalOrder` mutation to your storefront schema. This mutation will create a new paypal order.
 * ```graphql
 * mutation CreatePaypalOrder($cartId: ID!) {
 *   createPaypalOrder(orderId: $cartId) {
 *     apiErrors {
 *       code
 *       message
 *     }
 *     orderId
 *   }
 * }
 * ```
 *
 * 2. Install `@paypal/react-paypal-js` package
 * ```bash
 * yarn add \@paypal/react-paypal-js
 * ```
 *
 * 3. Create a PaypalButton component
 * ```tsx
 * // paypal-button.tsx
 * import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
 *
 * export const PaypalButton = ({orderId}: {orderId: string}) => {
 *   return (
 *     <PayPalScriptProvider
 *       options={{
 *         clientId: 'YOUR_PAYPAL_CLIENT_ID',
 *         components: 'buttons',
 *         currency: 'YOUR_STORE_CURRENCY' // Example: 'USD' | 'MXN'
 *       }}
 *     >
 *       <PayPalButtons
 *         style={{
 *           color: 'blue',
 *           layout: 'horizontal',
 *           tagline: false,
 *         }}
 *         createOrder={async () => {
 *           const result = await createPaypalOrder(orderId) // replace with your `createPaypalOrder` graphql mutation
 *
 *           return result.orderId
 *         }}
 *         onApprove={async (data) => {
 *           const result = await addPaymentToOrder(orderId, {method: methodId, metadata: {paypalOrderId: data.orderID}}) // replace with your `addPaymentToOrder` graphql mutation
 *
 *           // Redirect to the order confirmation page or show a success message
 *         }}
 *       >
 *
 *       </PayPalButtons>
 *     </PayPalScriptProvider>
 *   )
 * }
 * ```
 */
@EBlocPlugin({
  providers: [
    {
      provide: PAYPAL_PLUGIN_CONFIG,
      useFactory: (): PaypalPluginConfig => PaypalPlugin.config
    },
    PaypalService
  ],
  storefrontApiExtensions: {
    typePaths: [path.join(__dirname, './paypal.schema.gql')],
    resolvers: [PaypalResolver]
  },
  config: config => {
    config.payments.handlers.push(new PaypalPaymentHandler());

    return config;
  }
})
export class PaypalPlugin {
  static config: PaypalPluginConfig;

  /**
   * Initialize the paypal plugin
   */
  static init(config: PaypalPluginConfig): typeof PaypalPlugin {
    if (!config.clientId || !config.secret) {
      throw new Error(
        'PaypalPlugin: Missing required configuration, please provide clientId and secret'
      );
    }

    this.config = config;

    return PaypalPlugin;
  }
}

export type PaypalPluginConfig = {
  /**
   * Paypal client id
   *
   * @see https://developer.paypal.com/api/rest/?&_ga=2.40671527.481548134.1721421134-1988125686.1720040522#link-getclientidandclientsecret
   */
  clientId: string;
  /**
   * Paypal secret
   *
   * @see https://developer.paypal.com/api/rest/?&_ga=2.40671527.481548134.1721421134-1988125686.1720040522#link-getclientidandclientsecret
   */
  secret: string;
  /**
   * Paypal mode
   *
   * @description
   * Set to true if you want to use paypal in sandbox mode
   */
  devMode?: boolean;
};

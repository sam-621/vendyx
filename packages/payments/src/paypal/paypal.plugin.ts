import { EBlocPlugin } from '@ebloc/core';
import * as path from 'path';
import { PaypalResolver } from './paypal.resolver';
import { PaypalService } from './paypal.service';
import { PAYPAL_PLUGIN_CONFIG } from './paypal.constants';
import { PaypalPaymentHandler } from './paypal.handler';

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

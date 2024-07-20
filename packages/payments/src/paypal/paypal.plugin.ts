import { EBlocPlugin } from '@ebloc/core';
import * as path from 'path';
import { PaypalResolver } from './paypal.resolver';
import { PaypalService } from './paypal.service';

@EBlocPlugin({
  providers: [
    {
      provide: 'STRIPE_PLUGIN_OPTIONS',
      useFactory: (): any => PaypalPlugin.options
    },
    PaypalService
  ],
  storefrontApiExtensions: {
    typePaths: [path.join(__dirname, './paypal.schema.gql')],
    resolvers: [PaypalResolver]
  }
})
export class PaypalPlugin {
  static options: any;

  static init(options: any) {
    this.options = options;

    return PaypalPlugin;
  }
}

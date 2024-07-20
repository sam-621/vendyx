import { EBlocPlugin } from '@ebloc/core';
import * as path from 'path';
import { PaypalResolver } from './paypal.resolver';

@EBlocPlugin({
  storefrontApiExtensions: {
    typePaths: [path.join(__dirname, './paypal.schema.gql')],
    resolvers: [PaypalResolver]
  }
})
export class PaypalPlugin {}

import { EblocConfig } from './ebloc.config';

import { PaypalPaymentHandler, StripePaymentHandler } from '@/lib/payments';
import { ExoticPriceCalculator, FlatPriceCalculator } from '@/lib/shipping';
import { CloudinaryStorageProvider } from '@/lib/storage';

/**
 * This config is only for local development purposes
 */
export const DEFAULT_EBLOC_CONFIG: EblocConfig = {
  app: {
    port: 3000
  },
  auth: {
    jwtExpiresIn: '7d',
    jwtSecret: "randomBytes(32).toString('hex')"
  },
  db: {
    url: 'postgres://postgres:postgres@localhost:5432/ebloc'
    // url: 'postgresql://postgres:C635-525g65d6fEecce*eAc6fBDf5F6G@viaduct.proxy.rlwy.net:16696/railway'
  },
  assets: {
    storageProvider: new CloudinaryStorageProvider({
      cloudName: 'dnvp4s8pe',
      apiKey: '224627828215865',
      apiSecret: 'eos_1HKoJaRp7beDXp7s2Jh_2LM'
    })
  },
  payments: {
    handlers: [
      new PaypalPaymentHandler({
        clientId:
          'AalvT7sj_ccFI4BrY9VWIv0HZR6N7OwCxepfT0rH3h5fFbMCrOAp-v5R6gPEyvqNYWnxWgjFJ6VvSbHN',
        secret: 'EA1BrqeCBA2QMZWbIC4VVP1n2vtgTCcOxOI15IqduAiiJ9HkgFFpI0XllXfz_6BdXSWhRclg4fkgulRx',
        devMode: true
      }),
      new StripePaymentHandler()
    ]
  },
  shipping: {
    priceCalculators: [new FlatPriceCalculator(), new ExoticPriceCalculator()]
  },
  adminUi: {
    branding: {
      name: 'EBloc',
      description:
        "A functional and scalable minimal e-commerce admin that can be adjusted to any user's requirement."
    },
    serveUrl: '/admin'
  },
  plugins: []
};

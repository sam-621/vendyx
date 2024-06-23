import { EblocConfig } from './ebloc.config';

import { MercadoPagoIntegration, PaypalIntegration, StripeIntegration } from '@/lib/payments';
import { CountryPriceCalculator, FedexPriceCalculator } from '@/lib/shipping';
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
  },
  assets: {
    storageProvider: new CloudinaryStorageProvider({
      cloudName: 'dnvp4s8pe',
      apiKey: '224627828215865',
      apiSecret: 'eos_1HKoJaRp7beDXp7s2Jh_2LM'
    })
  },
  payments: {
    integrations: [new PaypalIntegration(), new StripeIntegration(), new MercadoPagoIntegration()]
  },
  shipping: {
    priceCalculators: [new CountryPriceCalculator(), new FedexPriceCalculator()]
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

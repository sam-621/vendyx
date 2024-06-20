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
    // url: 'postgres://postgres:postgres@localhost:5432/ebloc'
    url: 'postgresql://postgres:KEcyblbOCFexrbrsOojSnzyZNUYDZifJ@roundhouse.proxy.rlwy.net:47601/railway' 
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
  }
};

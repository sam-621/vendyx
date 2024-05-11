import {
  CloudinaryStorageProvider,
  CountryPriceCalculator,
  FedexPriceCalculator,
  MercadoPagoIntegration,
  PaypalIntegration,
  StripeIntegration,
  bootstrap
} from '@vendyx/core';
import { config } from 'dotenv';

config();

bootstrap({
  app: {
    port: Number(process.env.PORT) ?? 3000
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? '',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? ''
  },
  db: {
    url: process.env.DB_URL ?? ''
  },
  assets: {
    storageProvider: new CloudinaryStorageProvider({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
      apiKey: process.env.CLOUDINARY_API_KEY ?? '',
      apiSecret: process.env.CLOUDINARY_API_SECRET ?? ''
    })
  },
  shipping: {
    priceCalculators: [new CountryPriceCalculator(), new FedexPriceCalculator()]
  },
  payments: {
    integrations: [new PaypalIntegration(), new StripeIntegration(), new MercadoPagoIntegration()]
  }
});

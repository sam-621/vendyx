import {
  CloudinaryStorageProvider,
  FlatPriceCalculator,
  StripePaymentHandler,
  bootstrap
} from '@ebloc/core';
import { PaypalPlugin } from '@ebloc/payments';

import { config } from 'dotenv';

config();

bootstrap({
  app: {
    port: Number(process.env.PORT)
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN
  },
  db: {
    url: process.env.DB_URL
  },
  assets: {
    storageProvider: new CloudinaryStorageProvider({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    })
  },
  shipping: {
    priceCalculators: [new FlatPriceCalculator()]
  },
  payments: {
    handlers: [new StripePaymentHandler()]
  },
  adminUi: {
    branding: {
      name: 'EBloc',
      description:
        "A functional and scalable minimal e-commerce admin that can be adjusted to any user's requirement."
    },
    serveUrl: '/admin'
  },
  plugins: [
    PaypalPlugin.init({
      clientId: 'AalvT7sj_ccFI4BrY9VWIv0HZR6N7OwCxepfT0rH3h5fFbMCrOAp-v5R6gPEyvqNYWnxWgjFJ6VvSbHN',
      secret: 'EA1BrqeCBA2QMZWbIC4VVP1n2vtgTCcOxOI15IqduAiiJ9HkgFFpI0XllXfz_6BdXSWhRclg4fkgulRx',
      devMode: true
    })
  ]
});

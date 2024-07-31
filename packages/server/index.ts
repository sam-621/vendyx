import {
  CloudinaryStorageProvider,
  FlatPriceCalculator,
  TestPaymentHandler,
  bootstrap
} from '@ebloc/core';

import { config } from 'dotenv';
import { HelloWorldPlugin } from './plugins/hello-world/hello-world.plugin';

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
    handlers: [new TestPaymentHandler()]
  },
  plugins: []
});

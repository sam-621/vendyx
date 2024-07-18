import {
  CloudinaryStorageProvider,
  FlatPriceCalculator,
  PaypalPaymentHandler,
  StripePaymentHandler,
  bootstrap
} from '@ebloc/core';
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
    handlers: [new PaypalPaymentHandler(), new StripePaymentHandler()]
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
});

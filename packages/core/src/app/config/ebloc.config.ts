import { DynamicModule } from '@nestjs/common';

import { AdminUiConfig } from './admin-ui/admin-ui.config';
import { PaymentHandler } from './payments/payment-integration.config';
import { ShippingPriceCalculatorConfig } from './shipping/shipping-price-calculator.config';
import { StorageProvider } from './storage/storage-provider.config';

export interface EblocConfig {
  app: {
    port: number;
  };
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
  };
  db: {
    url: string;
  };
  assets: {
    storageProvider: StorageProvider;
  };
  payments: {
    handlers: PaymentHandler[];
  };
  shipping: {
    priceCalculators: ShippingPriceCalculatorConfig[];
  };
  adminUi: AdminUiConfig;
  plugins: DynamicModule[] | any[];
}

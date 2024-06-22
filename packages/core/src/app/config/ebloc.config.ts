import { AdminUiConfig } from './admin-ui/admin-ui.config';
import { PaymentIntegration } from './payments/payment-integration.config';
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
  adminUi?: Partial<AdminUiConfig>;
  assets: {
    storageProvider: StorageProvider;
  };
  payments: {
    integrations: PaymentIntegration[];
  };
  shipping: {
    priceCalculators: ShippingPriceCalculatorConfig[];
  };
}

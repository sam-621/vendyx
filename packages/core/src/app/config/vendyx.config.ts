import { PaymentIntegration } from './payments/payment-integration.config';
import { StorageProvider } from './storage/storage-provider.config';

export interface VendyxConfig {
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
    integrations: PaymentIntegration[];
  };
}

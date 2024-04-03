import { randomBytes } from 'crypto';

import { VendyxConfig } from './vendyx.config';

import { CloudinaryStorageProvider } from '@/lib/storage';

/**
 * This config is only for local development purposes
 */
export const DEFAULT_VENDYX_CONFIG: VendyxConfig = {
  app: {
    port: 5000,
  },
  auth: {
    jwtExpiresIn: '7d',
    jwtSecret: randomBytes(32).toString('hex'),
  },
  db: {
    url: 'postgres://postgres:postgres@localhost:5432/vendyx',
  },
  assets: {
    storageProvider: new CloudinaryStorageProvider({
      cloudName: 'dnvp4s8pe',
      apiKey: '224627828215865',
      apiSecret: 'eos_1HKoJaRp7beDXp7s2Jh_2LM',
    }),
  },
};

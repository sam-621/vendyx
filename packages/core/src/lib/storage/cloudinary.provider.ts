// cloudinary.service.ts
import { Logger } from '@nestjs/common';
import { v2 } from 'cloudinary';

import { StorageProvider } from './storage.type';

export class CloudinaryStorageProvider implements StorageProvider {
  name = 'Cloudinary';
  code = 'cloudinary';

  constructor(config: CloudinaryConfig) {
    v2.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });
  }

  async upload(file: string): Promise<string | null> {
    try {
      const fileUploaded = await v2.uploader.upload(file, {
        folder: 'vendyx',
      });

      return fileUploaded.secure_url;
    } catch (error) {
      Logger.error({
        provider: this.code,
        error,
      });
      return null;
    }
  }
}

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

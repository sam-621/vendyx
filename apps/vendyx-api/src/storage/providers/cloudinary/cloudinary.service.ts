import { Injectable, Logger } from '@nestjs/common';
import { v2 } from 'cloudinary';

import { CLOUDINARY_PROVIDER_KEY } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  async upload(file: Express.Multer.File) {
    try {
      const path = file.path;
      const fileUploaded = await v2.uploader.upload(path, {
        folder: 'vendyx'
      });

      return fileUploaded;
    } catch (error) {
      Logger.error({
        provider: CLOUDINARY_PROVIDER_KEY,
        error
      });
      return null;
    }
  }
}

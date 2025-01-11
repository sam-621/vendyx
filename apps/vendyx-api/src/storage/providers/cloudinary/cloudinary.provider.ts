import { Provider } from '@nestjs/common';
import { v2 } from 'cloudinary';

import { ConfigService } from '@/config/config.service';

export const CLOUDINARY_PROVIDER_KEY = 'CLOUDINARY';

export const CloudinaryProvider: Provider = {
  inject: [ConfigService],
  provide: CLOUDINARY_PROVIDER_KEY,
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get('CLOUDINARY.CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY.API_KEY'),
      api_secret: configService.get('CLOUDINARY.API_SECRET')
    });
  }
};

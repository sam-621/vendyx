import { randomUUID } from 'crypto';
import { extname, join } from 'path';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { BusinessModule } from '@/business/business.module';

import { uploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => ({
        storage: diskStorage({
          destination: join(process.cwd(), './uploads'),
          filename(_, file, callback) {
            callback(null, `${randomUUID()}${extname(file.originalname)}`);
          }
        })
      })
    }),
    BusinessModule
  ],
  controllers: [uploadController]
})
export class UploadApiModule {}

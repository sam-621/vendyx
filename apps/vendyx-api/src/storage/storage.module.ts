import { Module } from '@nestjs/common';

import { CloudinaryProvider } from './providers/cloudinary/cloudinary.provider';
import { CloudinaryService } from './providers/cloudinary/cloudinary.service';
import { StorageService } from './storage.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, StorageService],
  exports: [StorageService]
})
export class StorageModule {}

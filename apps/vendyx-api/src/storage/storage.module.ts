import { Module } from '@nestjs/common';

import { CloudinaryProvider, CloudinaryService } from './providers';
import { StorageService } from './storage.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, StorageService],
  exports: [StorageService]
})
export class StorageModule {}

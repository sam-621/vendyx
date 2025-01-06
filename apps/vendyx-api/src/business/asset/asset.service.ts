import { Injectable } from '@nestjs/common';

import { AssetRepository } from '@/persistence/repositories/asset.repository';
import { StorageService } from '@/storage/storage.service';

@Injectable()
export class AssetService {
  constructor(
    private readonly storageService: StorageService,
    private readonly assetRepository: AssetRepository
  ) {}

  async create(file: Express.Multer.File) {
    const url = await this.storageService.upload(file);

    // TODO: handle error
    if (!url) {
      return null;
    }

    return this.assetRepository.insert({ name: file.originalname, source: url });
  }
}

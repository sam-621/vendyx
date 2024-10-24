import { Injectable } from '@nestjs/common';

import { AssetRepository } from '@/persistance/repositories';
import { StorageService } from '@/storage';

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

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getConfig } from '@/app/config';
import { AssetEntity } from '@/app/persistance';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
  ) {}

  async create(file: Express.Multer.File) {
    const path = file.path;
    const provider = getConfig().assets.storageProvider;

    const fileId = await provider.upload(path);

    if (!fileId) {
      throw new BadRequestException('File could not be uploaded');
    }

    const assetToSave = this.assetRepository.create({
      name: file.originalname,
      source: fileId,
    });

    return this.assetRepository.save(assetToSave);
  }
}

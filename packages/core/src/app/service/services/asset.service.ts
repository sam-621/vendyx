import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssetEntity } from '@/app/persistance';
import { CloudinaryStorageProvider } from '@/lib/storage';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
  ) {}

  async create(file: Express.Multer.File) {
    const path = file.path;

    // key for test env, will bne removed on production env
    const provider = new CloudinaryStorageProvider({
      cloudName: 'dnvp4s8pe',
      apiKey: '224627828215865',
      apiSecret: 'eos_1HKoJaRp7beDXp7s2Jh_2LM',
    });

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

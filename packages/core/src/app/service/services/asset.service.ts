import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';

import { getConfig } from '@/app/config';
import { AssetEntity, AssetInProductEntity } from '@/app/persistance';

@Injectable()
export class AssetService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async create(file: Express.Multer.File) {
    const path = file.path;
    const provider = getConfig().assets.storageProvider;

    const fileId = await provider.upload(path);

    if (!fileId) {
      throw new BadRequestException('File could not be uploaded');
    }

    const assetToSave = this.db.getRepository(AssetEntity).create({
      name: file.originalname,
      source: fileId
    });

    return this.db.getRepository(AssetEntity).save(assetToSave);
  }

  /**
   * Remove assets by their ids
   *
   * 1. Remove all references to the assets in the product
   * 2. Remove the assets
   */
  async remove(ids: string[]) {
    await this.db.getRepository(AssetInProductEntity).delete({ asset: { id: In(ids) } });
    await this.db.getRepository(AssetEntity).delete(ids);

    return true;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { getConfig } from '@/app/config';
import { AssetEntity } from '@/app/persistance';

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

  async remove(ids: string[]) {
    // Check if the assets are in use by products or collections. This is commented by now because is a complex operation and in the current admin ui we make sure that the assets are not in use before removing them.

    // const AssetsToRemove = await this.db.getRepository(AssetEntity).find({
    //   where: { id: In(ids) },
    //   relations: {
    //     products: true,
    //     collections: true
    //   }
    // });

    // if (AssetsToRemove.some(asset => asset.products.length || asset.collections.length)) {
    //   return new ErrorResult(
    //     AssetErrorCode.ASSET_IN_USE,
    //     'Some of the assets are in use by products or collections'
    //   );
    // }

    await this.db.getRepository(AssetEntity).delete(ids);

    return true;
  }
}

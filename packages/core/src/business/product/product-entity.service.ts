import { clean } from '@ebloc/common';
import { DataSource } from 'typeorm';

import { ListInput } from '@/api/common';
import {
  AssetInProductEntity,
  ID,
  OptionEntity,
  ProductEntity,
  VariantEntity
} from '@/persistance';

export class ProductEntityService {
  constructor(private readonly _db: DataSource) {}

  /**
   * @description
   * Find all products
   */
  async find(input: FindInput) {
    return this._db.getRepository(ProductEntity).find({
      ...clean(input),
      where: {
        ...(input.onlyEnabled && { enabled: true }),
        ...(input.onlyArchived && { archived: true })
      },
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * @description
   * Find a product by its uniques
   */
  async findUnique(input: FindUnique) {
    return this._db.getRepository(ProductEntity).findOne({
      where: {
        ...(input.id && { id: input.id }),
        ...(input.slug && { slug: input.slug }),
        ...(input.onlyEnabled && { enabled: true }),
        ...(input.onlyArchived && { archived: true })
      }
    });
  }

  async findVariants(id: ID, input: ListInput) {
    return await this._db.getRepository(VariantEntity).find({
      where: { product: { id } },
      ...clean(input),
      order: { createdAt: 'ASC' }
    });
  }

  async findAssets(id: ID, listInput: ListInput) {
    const assets = await this._db.getRepository(AssetInProductEntity).find({
      where: { product: { id } },
      ...clean(listInput),
      order: { order: 'ASC' },
      relations: { asset: true }
    });

    return assets.map(a => ({ ...a.asset, order: a.order }));
  }

  async findOptions(id: ID) {
    return this._db
      .getRepository(OptionEntity)
      .find({ where: { product: { id } }, order: { createdAt: 'ASC' } });
  }
}

type FindInput = ListInput & { onlyEnabled?: boolean; onlyArchived?: boolean };
type FindUnique = { id?: ID; slug?: string; onlyEnabled?: boolean; onlyArchived?: boolean };

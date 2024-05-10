import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { getParsedSlug } from '@vendyx/common';
import { DataSource, FindOptionsWhere, In, Not } from 'typeorm';

import {
  CreateProductInput,
  ListInput,
  UpdateProductInput,
} from '@/app/api/common';
import {
  AssetEntity,
  ID,
  ProductEntity,
  VariantEntity,
} from '@/app/persistance';
import { UserInputError } from '@/lib/errors';

@Injectable()
export class ProductService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async find(input: ListInput & { where?: FindOptionsWhere<ProductEntity> }) {
    return this.db.getRepository(ProductEntity).find({
      ...input,
      where: input?.where,
      order: { createdAt: 'DESC' },
    });
  }

  async findUnique({
    id,
    slug,
    where,
  }: {
    id: ID;
    slug: string;
    where?: FindOptionsWhere<ProductEntity>;
  }) {
    if (id) {
      return this.db
        .getRepository(ProductEntity)
        .findOne({ where: { ...where, id } });
    }

    if (slug) {
      return this.db
        .getRepository(ProductEntity)
        .findOne({ where: { ...where, slug } });
    }

    throw new UserInputError('No ID or SLUG provided');
  }

  async findVariants(id: ID, listInput?: ListInput) {
    const variants = await this.db.getRepository(VariantEntity).find({
      where: { product: { id } },
      ...listInput,
    });

    return variants;
  }

  async findAssets(id: ID, listInput?: ListInput) {
    const assets = await this.db.getRepository(AssetEntity).find({
      where: { products: { id: id } },
      ...listInput,
    });

    return assets;
  }

  async create(input: CreateProductInput) {
    const data = {
      ...input,
      slug: getParsedSlug(input.slug),
    };

    const isDuplicatedSlug = await this.findBySlug(data.slug);

    if (isDuplicatedSlug) {
      throw new UserInputError(
        `A product with slug "${data.slug}" already exists`,
      );
    }

    const assets = input.assetsIds?.length
      ? await this.db.getRepository(AssetEntity).find({
          where: { id: In(input.assetsIds) },
        })
      : undefined;

    const productToSave = this.db.getRepository(ProductEntity).create({
      ...data,
      assets,
    });
    return this.db.getRepository(ProductEntity).save(productToSave);
  }

  async update(id: ID, input: UpdateProductInput) {
    const productToUpdate = await this.findById(id);

    if (!productToUpdate) {
      throw new UserInputError('No product found with the given id');
    }

    if (input.slug) {
      const productExists = await this.db.getRepository(ProductEntity).findOne({
        where: { slug: getParsedSlug(input.slug), id: Not(id) },
      });

      if (productExists) {
        throw new UserInputError(
          `A product with slug "${getParsedSlug(input.slug)}" already exists`,
        );
      }
    }

    const newAssets =
      input.assetsIds?.length !== undefined
        ? await this.db.getRepository(AssetEntity).find({
            where: { id: In(input.assetsIds) },
          })
        : undefined;

    return await this.db.getRepository(ProductEntity).save({
      ...productToUpdate,
      ...input,
      slug: input.slug ? getParsedSlug(input.slug) : productToUpdate.slug,
      assets: newAssets,
    });
  }

  /**
   * Apply a soft delete for the current product and its variant
   * We cannot remove permanently the product because it may have orders
   * The assets are independent of the product so they are not removed
   */
  async remove(id: ID) {
    const productToRemove = await this.db.getRepository(ProductEntity).findOne({
      where: { id },
    });

    if (!productToRemove) {
      throw new UserInputError('No product found with the given id');
    }

    await this.db.getRepository(ProductEntity).save({
      ...productToRemove,
      // avoid slug duplication for new records
      slug: randomUUID(),
    });
    await this.db.getRepository(ProductEntity).softDelete({ id });
    await this.db.getRepository(VariantEntity).softDelete({ product: { id } });

    return true;
  }

  private async findById(id: ID) {
    return this.db.getRepository(ProductEntity).findOne({ where: { id } });
  }

  private async findBySlug(slug: ID) {
    return this.db.getRepository(ProductEntity).findOne({ where: { slug } });
  }
}

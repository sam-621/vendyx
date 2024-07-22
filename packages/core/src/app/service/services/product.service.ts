import { randomUUID } from 'crypto';

import { clean, getParsedSlug } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, In, Not } from 'typeorm';

import { AssetService } from './asset.service';
import { ErrorResult } from '../utils';

import {
  CreateProductInput,
  ListInput,
  ProductErrorCode,
  UpdateProductInput
} from '@/app/api/common';
import { AssetEntity, ID, ProductEntity, VariantEntity } from '@/app/persistance';
import { AssetInProductEntity } from '@/app/persistance/entities/asset-on-product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectDataSource() private db: DataSource,
    private readonly assetService: AssetService
  ) {}

  async find(input: ListInput & { where?: FindOptionsWhere<ProductEntity> }) {
    return this.db.getRepository(ProductEntity).find({
      ...clean(input),
      where: input?.where,
      order: { createdAt: 'DESC' }
    });
  }

  async findUnique({
    id,
    slug,
    where
  }: {
    id: ID;
    slug: string;
    where?: FindOptionsWhere<ProductEntity>;
  }) {
    if (id) {
      return this.db.getRepository(ProductEntity).findOne({ where: { ...where, id } });
    }

    if (slug) {
      return this.db.getRepository(ProductEntity).findOne({ where: { ...where, slug } });
    }

    return null;
  }

  async findVariants(id: ID, listInput: ListInput) {
    const variants = await this.db.getRepository(VariantEntity).find({
      where: { product: { id } },
      ...clean(listInput),
      order: { createdAt: 'ASC' }
    });

    return variants;
  }

  async findAssets(id: ID, listInput: ListInput) {
    const assets = await this.db.getRepository(AssetInProductEntity).find({
      where: { product: { id } },
      ...clean(listInput),
      order: { order: 'ASC' },
      relations: { asset: true }
    });

    return assets.map(a => ({ ...a.asset, order: a.order }));
  }

  async findOptions(id: ID) {
    const product = await this.db.getRepository(ProductEntity).find({
      where: { id },
      relations: { variants: { optionValues: { option: true } } }
    });

    return product
      .map(p => p.variants)
      .flat()
      .map(v => v.optionValues)
      .flat()
      .map(ov => ov.option)
      .filter((item, index, self) => index === self.findIndex(t => t.id === item.id))
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  /**
   * Creates a new product entity
   * @param input Data to create a new product
   * @returns Error Result or the created product
   */
  async create(input: CreateProductInput): Promise<ErrorResult<ProductErrorCode> | ProductEntity> {
    const data = {
      ...input,
      slug: getParsedSlug(input.slug)
    };

    const isDuplicatedSlug = await this.findBySlug(data.slug);

    if (isDuplicatedSlug) {
      return new ErrorResult(
        ProductErrorCode.DUPLICATED_SLUG,
        `A product with slug "${data.slug}" already exists`
      );
    }

    const assets = input.assets?.length
      ? await this.db.getRepository(AssetEntity).find({
          where: { id: In(input.assets.map(a => a.id)) }
        })
      : undefined;

    const productToSave = this.db.getRepository(ProductEntity).create({
      ...clean(data)
    });

    const productCreated = await this.db.getRepository(ProductEntity).save(productToSave);

    if (assets?.length) {
      await this.db.getRepository(AssetInProductEntity).save(
        assets.map(asset => ({
          asset_in_product: asset.id + productCreated.id,
          asset: asset,
          product: productCreated,
          order: input.assets?.find(a => a.id === asset.id)?.order ?? 1
        }))
      );
    }

    return productCreated;
  }

  /**
   * Update a product entity
   * @param id Product id to update
   * @param input Input that contains the new data
   * @returns Error Result or the updated product
   */
  async update(
    id: ID,
    input: UpdateProductInput
  ): Promise<ErrorResult<ProductErrorCode> | ProductEntity> {
    const productToUpdate = await this.findById(id);

    if (!productToUpdate) {
      return new ErrorResult(
        ProductErrorCode.PRODUCT_NOT_FOUND,
        'No product found with the given id'
      );
    }

    if (input.slug) {
      const productExists = await this.db.getRepository(ProductEntity).findOne({
        where: { slug: getParsedSlug(input.slug), id: Not(id) }
      });

      if (productExists) {
        return new ErrorResult(
          ProductErrorCode.DUPLICATED_SLUG,
          `A product with slug "${input.slug}" already exists`
        );
      }
    }

    const newAssets =
      input.assets?.length !== undefined
        ? await this.db.getRepository(AssetEntity).find({
            where: { id: In(input.assets.map(a => a.id)) }
          })
        : undefined;

    if (newAssets?.length) {
      await this.db.getRepository(AssetInProductEntity).save(
        newAssets.map(asset => ({
          asset_in_product: asset.id + productToUpdate.id,
          asset: asset,
          product: productToUpdate,
          order: input.assets?.find(a => a.id === asset.id)?.order ?? 1
        }))
      );
    }

    return await this.db.getRepository(ProductEntity).save({
      ...productToUpdate,
      ...clean(input),
      slug: input.slug ? getParsedSlug(input.slug) : productToUpdate.slug
    });
  }

  /**
   * Remove a product entity
   *
   * 1. Check if the product exists
   * 2. Check if the product has variants
   * 3. Remove the product
   * 4. Remove the assets
   * 5. Soft delete the product if it has variants soft deleted
   * 6. Hard delete the product if it has no variants
   *
   */
  async remove(id: ID): Promise<ErrorResult<ProductErrorCode> | boolean> {
    const productToRemove = await this.db.getRepository(ProductEntity).findOne({
      where: { id },
      relations: { assetsInProduct: { asset: true } }
    });

    if (!productToRemove) {
      return new ErrorResult(
        ProductErrorCode.PRODUCT_NOT_FOUND,
        'No product found with the given id'
      );
    }

    const productVariants = await this.db.getRepository(VariantEntity).find({
      where: { product: { id } },
      withDeleted: true
    });

    const hasVariantsSoftDeleted = productVariants.some(v => v.deletedAt !== null);
    const variantsInProduct = productVariants.filter(v => !v.deletedAt);

    if (variantsInProduct.length) {
      return new ErrorResult(
        ProductErrorCode.PRODUCT_HAS_VARIANTS,
        'The product has variants, please remove them first'
      );
    }

    await this.db.getRepository(ProductEntity).save({
      ...productToRemove,
      assets: [],
      // avoid slug duplication for new records
      slug: randomUUID()
    });

    const assetsToRemove = productToRemove.assetsInProduct.map(a => a.asset);
    if (assetsToRemove.length) {
      await this.assetService.remove(assetsToRemove.map(asset => asset.id));
    }

    if (hasVariantsSoftDeleted) {
      await this.db.getRepository(ProductEntity).softDelete({ id });
    } else {
      await this.db.getRepository(ProductEntity).delete({ id });
    }

    return true;
  }

  private async findById(id: ID) {
    return this.db.getRepository(ProductEntity).findOne({ where: { id } });
  }

  private async findBySlug(slug: ID) {
    return this.db.getRepository(ProductEntity).findOne({ where: { slug } });
  }
}

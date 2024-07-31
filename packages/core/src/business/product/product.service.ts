import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ProductNotFoundError } from './product.errors';
import { CommonService } from '../common';
import { ErrorResult } from '../utils';

import { CreateProductInput, ListInput, ProductErrorCode, UpdateProductInput } from '@/api/common';
import {
  AssetInProductEntity,
  ID,
  OptionEntity,
  ProductEntity,
  VariantEntity
} from '@/persistance';

@Injectable()
export class ProductService extends CommonService<ProductEntity> {
  constructor(@InjectDataSource() private readonly db: DataSource) {
    super(db, ProductEntity);
  }

  /**
   * @description
   * Create a product and parse its slug
   */
  async create(input: CreateProductInput): Promise<MutationResult> {
    const slug = await this.validateAndParseSlug(input.name);

    const product = await this._create({
      ...clean(input),
      slug
    });

    return product;
  }

  /**
   * @description
   * Update a product and parse its slug if the name has changed
   */
  async update(id: ID, input: UpdateProductInput): Promise<MutationResult> {
    const productToUpdate = await this.findUnique({ id });

    if (!productToUpdate) return new ProductNotFoundError();

    const product = await this._update(id, {
      ...productToUpdate,
      ...clean(input),
      slug: input.name ? await this.validateAndParseSlug(input.name) : undefined
    });

    return product;
  }

  /**
   * @description
   * Soft remove a product
   * - Remove all assets in the product
   * - Append the product id to the slug to avoid duplication
   * - Soft remove the product
   */
  async softRemove(id: ID): Promise<MutationResult> {
    const product = await this.findUnique({ id });

    if (!product) return new ProductNotFoundError();

    return this._softRemove(id);
  }

  /**
   * @description
   * Parse slug and validate if there are other products with the same name,
   * if so, append a number to the slug to avoid duplication
   */
  private async validateAndParseSlug(name: string) {
    const slug = this.parseSlug(name);

    const productNameCount = await this.count({ name });

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }

  private parseSlug(name: string) {
    return name
      .toLowerCase()
      .replaceAll(' ', '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  async findVariants(id: ID, input: ListInput) {
    return await this.db.getRepository(VariantEntity).find({
      where: { product: { id } },
      ...clean(input),
      order: { createdAt: 'ASC' }
    });
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
    return this.db
      .getRepository(OptionEntity)
      .find({ where: { product: { id } }, order: { createdAt: 'ASC' } });
  }
}

type MutationResult = ErrorResult<ProductErrorCode> | ProductEntity;

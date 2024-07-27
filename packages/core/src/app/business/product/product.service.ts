import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ProductEntityService } from './product-entity.service';
import { ProductNotFoundError } from './product.errors';
import { ErrorResult } from '../utils';

import { CreateProductInput, ProductErrorCode, UpdateProductInput } from '@/app/api/common';
import { ID, ProductEntity } from '@/app/persistance';

@Injectable()
export class ProductService extends ProductEntityService {
  constructor(@InjectDataSource() private readonly db: DataSource) {
    super(db);
  }

  /**
   * @description
   * Create a product and parse its slug
   */
  async create(input: CreateProductInput): Promise<MutationResult> {
    const slug = await this.validateAndParseSlug(input.name);

    return this.db.getRepository(ProductEntity).save({
      ...clean(input),
      slug
    });
  }

  /**
   * @description
   * Update a product and parse its slug if the name has changed
   */
  async update(id: ID, input: UpdateProductInput): Promise<MutationResult> {
    const product = await this.findUnique({ id });

    if (!product) return new ProductNotFoundError();

    const slug = input.name ? await this.validateAndParseSlug(input.name) : undefined;

    return this.db.getRepository(ProductEntity).save({
      ...product,
      ...clean(input),
      slug
    });
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

    return this.db
      .getRepository(ProductEntity)
      .softRemove({ ...product, assetsInProduct: [], slug: `${product.slug}-${product.id}` });
  }

  /**
   * @description
   * Parse slug and validate if there are other products with the same name,
   * if so, append a number to the slug to avoid duplication
   */
  private async validateAndParseSlug(name: string) {
    const slug = this.parseSlug(name);

    const productNameCount = await this.db.getRepository(ProductEntity).count({ where: { name } });

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
}

type MutationResult = ErrorResult<ProductErrorCode> | ProductEntity;

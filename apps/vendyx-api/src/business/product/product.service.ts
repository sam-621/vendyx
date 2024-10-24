import { Injectable } from '@nestjs/common';

import {
  CreateProductInput,
  ProductFilters,
  ProductListInput,
  UpdateProductInput
} from '@/api/shared';
import { ProductRepository } from '@/persistance/repositories';

import { clean, getSlugBy } from '../shared';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async find(input?: ProductListInput) {
    return this.productRepository.findMany({
      ...input,
      filters: {
        achived: { equals: false },
        ...input?.filters
      }
    });
  }

  async count(input?: ProductListInput) {
    return this.productRepository.count({
      ...input,
      filters: {
        achived: { equals: false },
        ...input?.filters
      }
    });
  }

  async findById(id: string, filters?: ProductFilters) {
    return this.productRepository.findById(id, filters);
  }

  async create(input: CreateProductInput) {
    const slug = await this.validateAndParseSlug(input.name);

    const product = await this.productRepository.insert({
      ...clean(input),
      slug,
      assets: input.assets
        ? { create: input.assets.map(asset => ({ assetId: asset.id, order: asset.order })) }
        : undefined
    });

    return product;
  }

  async update(id: string, input: UpdateProductInput) {
    return this.productRepository.update(id, {
      ...clean(input),
      slug: input.name ? await this.validateAndParseSlug(input.name) : undefined,
      assets: input.assets
        ? {
            connectOrCreate: input.assets.map(asset => ({
              where: { productId_assetId: { productId: id, assetId: asset.id } },
              create: { assetId: asset.id, order: asset.order }
            }))
          }
        : undefined
    });
  }

  async softRemove(ids: string[]) {
    await Promise.all(
      ids.map(async id => {
        await this.productRepository.hardDeleteOptions(id);
        await this.productRepository.hardDeleteAssets(id);
        await this.productRepository.softDelete(id);
      })
    );

    return true;
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const productNameCount = await this.productRepository.count();

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }
}

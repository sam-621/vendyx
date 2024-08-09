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
      slug
    });

    return product;
  }

  async update(id: string, input: UpdateProductInput) {
    return this.productRepository.update(id, {
      ...clean(input),
      slug: input.name ? await this.validateAndParseSlug(input.name) : undefined
    });
  }

  async softRemove(id: string) {
    return this.productRepository.softDelete(id);
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const productNameCount = await this.productRepository.count();

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }
}

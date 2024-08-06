import { Injectable } from '@nestjs/common';

import { CreateProductInput, ListInput, UpdateProductInput } from '@/api/shared';
import { ProductRepository } from '@/persistance/repositories';

import { clean, getSlugBy } from '../shared';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async find(input?: ListInput, onlyEnabled = false) {
    return this.productRepository.findMany({
      ...input,
      enabled: onlyEnabled || undefined,
      archived: false
    });
  }

  async findById(id: string, onlyEnabled = false) {
    return this.productRepository.findById(id, { enabled: onlyEnabled || undefined });
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

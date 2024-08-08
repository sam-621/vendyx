import { Injectable } from '@nestjs/common';

import { CreateShopInput, ListInput } from '@/api/shared';
import { ShopRepository } from '@/persistance/repositories';

import { getSlugBy } from '../shared';

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) {}

  async findBySlug(slug: string) {
    return this.shopRepository.findBySlug(slug);
  }

  async find(input?: ListInput) {
    return this.shopRepository.findMany(input);
  }

  async count(input?: ListInput) {
    return this.shopRepository.count(input);
  }

  async create(input: CreateShopInput) {
    const slug = await this.validateAndParseSlug(input.name);

    return this.shopRepository.insert({
      name: input.name,
      slug
    });
  }

  /**
   * @description
   * Parse slug and validate if there are other shops with the same name,
   * if so, append a number to the slug to avoid duplication
   */
  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const shopNameCount = await this.shopRepository.getTotalByName(name);

    if (!shopNameCount) return slug;

    return slug + '-' + shopNameCount;
  }
}

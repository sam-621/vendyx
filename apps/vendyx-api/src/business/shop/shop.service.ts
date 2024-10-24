import { Injectable } from '@nestjs/common';

import { CreateShopInput, ListInput } from '@/api/shared';
import { AuthService } from '@/auth';
import { ShopRepository } from '@/persistance/repositories';

import { getSlugBy } from '../shared';

@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly authService: AuthService
  ) {}

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
    const shopApiKey = await this.authService.generateShopApiKey();

    return this.shopRepository.insert({
      name: input.name,
      slug,
      shopApiKey
    });
  }

  async validateShopApiKey(shopId: string, shopApiKey: string) {
    const shop = await this.shopRepository.findById(shopId);

    if (!shop) {
      return {
        isValid: false,
        cause: 'Shop with the given ID does not exist'
      };
    }

    const isValidApiKey = await this.authService.compare(shopApiKey, shop.shopApiKey);

    return {
      isValid: isValidApiKey,
      cause: isValidApiKey ? null : 'Invalid shop API key'
    };
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

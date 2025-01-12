import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateShopInput, ListInput, UpdateShopInput } from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_ADMIN,
  PrismaForAdmin
} from '@/persistence/prisma-clients/prisma-for-admin.provider';
import { ShopRepository } from '@/persistence/repositories/shop.repository';
import { SecurityService } from '@/security/security.service';

import { EmailAlreadyExists, EmailNotVerified } from './shop.errors';
import { clean } from '../shared/utils/clean.utils';
import { getSlugBy } from '../shared/utils/slug.utils';

@Injectable()
export class ShopService {
  constructor(
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin,
    private readonly shopRepository: ShopRepository,
    private readonly securityService: SecurityService
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

  async create(input: CreateShopInput, emailVerified: boolean) {
    if (!emailVerified) {
      return new EmailNotVerified();
    }

    const emailExists = await this.prismaForAdmin.shop.count({
      where: { email: input.email }
    });

    if (emailExists) {
      return new EmailAlreadyExists();
    }

    const slug = await this.validateAndParseSlug(input.name);
    const shopApiKey = this.securityService.generateShopApiKey();

    return this.shopRepository.insert({
      ...clean(input),
      slug,
      shopApiKey,
      address: input.address as unknown as Prisma.JsonObject
    });
  }

  async update(shopSlug: string, input: UpdateShopInput) {
    if (input.email) {
      const emailExists = await this.prismaForAdmin.shop.findUnique({
        where: { email: input.email },
        select: { slug: true }
      });

      if (emailExists && emailExists.slug !== shopSlug) {
        return new EmailAlreadyExists();
      }
    }

    return this.shopRepository.update(shopSlug, clean(input));
  }

  async validateShopApiKey(shopId: string, shopApiKey: string) {
    const shop = await this.shopRepository.findById(shopId);

    if (!shop) {
      return {
        isValid: false,
        cause: 'Shop with the given ID does not exist'
      };
    }

    const isValidApiKey = shopApiKey === shop.shopApiKey;

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
    console.log({
      shopNameCount
    });

    if (!shopNameCount) return slug;

    return slug + '-' + shopNameCount;
  }
}

import { Inject } from '@nestjs/common';

import { CreateCollectionInput, ListInput, UpdateCollectionInput } from '@/api/shared';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';
import { ID } from '@/persistance/types';

import { clean, getSlugBy } from '../shared';

export class CollectionService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async find(input?: ListInput) {
    return this.prisma.collection.findMany({
      ...clean(input ?? {}),
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: ID) {
    return this.prisma.collection.findUnique({ where: { id } });
  }

  async create(input: CreateCollectionInput) {
    const { assets, products, ...rest } = input;
    const slug = await this.validateAndParseSlug(input.name);

    return await this.prisma.collection.create({
      data: {
        ...clean(rest),
        slug,
        assets: assets
          ? { create: assets.map(asset => ({ assetId: asset.id, order: 0 })) }
          : undefined,
        products: products
          ? { create: products.map(product => ({ productId: product, order: 0 })) }
          : undefined
      }
    });
  }

  async update(id: ID, input: UpdateCollectionInput) {
    const { assets, products, ...rest } = input;

    return this.prisma.collection.update({
      where: { id },
      data: {
        ...clean(rest),
        slug: input.name ? await this.validateAndParseSlug(input.name) : undefined,
        assets: assets
          ? {
              upsert: assets.map(asset => ({
                where: { collectionId_assetId: { assetId: asset.id, collectionId: id } },
                create: { assetId: asset.id, collectionId: id, order: 0 },
                update: { order: 0 }
              }))
            }
          : undefined,
        products: products
          ? {
              connectOrCreate: products.map(product => ({
                where: { productId_collectionId: { productId: product, collectionId: id } },
                create: { productId: product, collectionId: id }
              }))
            }
          : undefined
      }
    });
  }

  async remove(id: ID) {
    await this.prisma.$transaction([
      this.prisma.collectionAsset.deleteMany({ where: { collectionId: id } }),
      this.prisma.productCollection.deleteMany({ where: { collectionId: id } }),
      this.prisma.collection.delete({ where: { id } })
    ]);

    return true;
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const collectionCount = await this.prisma.collection.count({ where: { name } });

    if (!collectionCount) return slug;

    return slug + '-' + collectionCount;
  }
}

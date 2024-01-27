import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

import { getParsedSlug } from '../utils';

import {
  CreateProductInput,
  ListInput,
  UpdateProductInput,
} from '@/app/api/common';
import {
  AssetEntity,
  ID,
  ProductEntity,
  VariantEntity,
} from '@/app/persistance';
import { UserInputError } from '@/lib/errors';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
    @InjectRepository(VariantEntity)
    private variantRepository: Repository<VariantEntity>,
  ) {}

  async find(input: ListInput) {
    return this.productRepository.find({ ...input });
  }

  async findUnique({ id, slug }: { id: ID; slug: string }) {
    if (id) {
      return this.findById(id);
    }

    if (slug) {
      return this.findBySlug(slug);
    }

    throw new UserInputError('No ID or SLUG provided');
  }

  async findVariants(id: ID, listInput?: ListInput) {
    const variants = await this.variantRepository.find({
      where: { product: { id } },
      ...listInput,
    });

    return variants;
  }

  async findAssets(id: ID, listInput?: ListInput) {
    const assets = await this.assetRepository.find({
      where: { products: { id: id } },
      ...listInput,
    });

    return assets;
  }

  async create(input: CreateProductInput) {
    const data = {
      ...input,
      slug: getParsedSlug(input.slug),
    };

    const isDuplicatedSlug = await this.findBySlug(data.slug);

    if (isDuplicatedSlug) {
      throw new UserInputError(
        `A product with slug "${data.slug}" already exists`,
      );
    }

    const assets = input.assetsIds?.length
      ? await this.assetRepository.find({
          where: { id: In(input.assetsIds) },
        })
      : undefined;

    const productToSave = this.productRepository.create({
      ...data,
      assets,
    });
    return this.productRepository.save(productToSave);
  }

  async update(id: ID, input: UpdateProductInput) {
    const productToUpdate = await this.findById(id);

    if (!productToUpdate) {
      throw new UserInputError('No product found with the given id');
    }

    if (input.slug) {
      const productExists = await this.productRepository.findOne({
        where: { slug: getParsedSlug(input.slug), id: Not(id) },
      });

      if (productExists) {
        throw new UserInputError(
          `A product with slug "${getParsedSlug(input.slug)}" already exists`,
        );
      }
    }

    const newAssets =
      input.assetsIds?.length !== undefined
        ? await this.assetRepository.find({
            where: { id: In(input.assetsIds) },
          })
        : undefined;

    return await this.productRepository.save({
      ...productToUpdate,
      ...input,
      slug: input.slug ? getParsedSlug(input.slug) : productToUpdate.slug,
      assets: newAssets,
    });
  }

  async remove(id: ID) {
    const productToRemove = await this.productRepository.findOne({
      where: { id },
      relations: {
        assets: true,
      },
    });

    if (!productToRemove) {
      throw new UserInputError('No product found with the given id');
    }

    if (productToRemove.assets?.length) {
      productToRemove.assets = productToRemove.assets = [];
    }

    await this.productRepository.save({
      ...productToRemove,
      // avoid slug duplication for new records
      slug: randomUUID(),
    });
    await this.productRepository.softDelete({ id });

    return true;
  }

  private async findById(id: ID) {
    return this.productRepository.findOne({ where: { id } });
  }

  private async findBySlug(slug: ID) {
    return this.productRepository.findOne({ where: { slug } });
  }
}

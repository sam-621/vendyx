import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { getParsedSlug } from '../utils';

import {
  CreateProductInput,
  ListInput,
  UpdateProductInput,
} from '@/app/api/common';
import { AssetEntity, ID, ProductEntity } from '@/app/persistance';
import { UserInputError } from '@/lib/errors';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
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
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { variants: true },
      ...listInput,
    });

    return product.variants;
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

    const productToSave = this.productRepository.create({
      ...data,
      assets: input.assets
        ? input.assets.map((asset) =>
            this.assetRepository.create({ source: asset }),
          )
        : undefined,
    });
    await this.productRepository.insert(productToSave);

    return productToSave;
  }

  async update(id: ID, input: UpdateProductInput) {
    const data = {
      ...input,
      slug: input.slug ? getParsedSlug(input.slug) : undefined,
    };

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
          `A product with slug "${data.slug}" already exists`,
        );
      }
    }

    return await this.productRepository.save({
      ...productToUpdate,
      ...input,
      slug: input.slug ? getParsedSlug(input.slug) : productToUpdate.slug,
    });
  }

  async remove(id: ID) {
    const productToRemove = await this.findById(id);

    if (!productToRemove) {
      throw new UserInputError('No product found with the given id');
    }

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

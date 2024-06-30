import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { DataSource, In } from 'typeorm';

import { ErrorResult } from '../utils';

import { CollectionErrorCode, CreateCollectionInput, ListInput } from '@/app/api/common';
import { CollectionEntity, ID, ProductEntity } from '@/app/persistance';

@Injectable()
export class CollectionService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Get all collections.
   */
  async find(input: ListInput & { onlyEnabled?: boolean }) {
    return this.db.getRepository(CollectionEntity).find({
      where: { enabled: input.onlyEnabled || undefined },
      ...clean(input),
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Get a collection by id or slug, if none is provided, throw an error.
   */
  async findUnique({ id, slug, onlyEnabled }: FinUniqueInput) {
    if (id) {
      return this.db
        .getRepository(CollectionEntity)
        .findOne({ where: { id, enabled: onlyEnabled || undefined } });
    }

    if (slug) {
      return this.db
        .getRepository(CollectionEntity)
        .findOne({ where: { slug, enabled: onlyEnabled || undefined } });
    }

    throw new Error('You must provide either an id or a slug to find a collection');
  }

  /**
   * Get a collection by id or slug. If none is provided, throw a graphql error
   */
  async findByIdOrdSlug({ id, slug, onlyEnabled }: FinUniqueInput) {
    if (id) {
      return this.findUnique({ id, onlyEnabled });
    }

    if (slug) {
      return this.findUnique({ slug, onlyEnabled });
    }

    throw new GraphQLError('You must provide either an id or a slug to find a collection');
  }

  /**
   * Create a new collection.
   */
  async create(input: CreateCollectionInput): MutationResult {
    const collectionWithTheSameSlug = await this.findUnique({ slug: input.slug });

    if (collectionWithTheSameSlug) {
      return new ErrorResult(
        CollectionErrorCode.DUPLICATED_SLUG,
        `A collection with slug "${input.slug}" already exists`
      );
    }

    return this.db.getRepository(CollectionEntity).save(clean(input));
  }

  /**
   * Update a collection.
   */
  async update(id: ID, input: CreateCollectionInput): MutationResult {
    const collection = await this.findUnique({ id });

    if (!collection) {
      return new ErrorResult(
        CollectionErrorCode.COLLECTION_NOT_FOUND,
        `Collection with id ${id} not found`
      );
    }

    if (input.slug && input.slug !== collection.slug) {
      const slugAlreadyExists = await this.findUnique({ slug: input.slug });

      if (slugAlreadyExists) {
        return new ErrorResult(
          CollectionErrorCode.DUPLICATED_SLUG,
          `A collection with slug "${input.slug}" already exists`
        );
      }
    }

    return this.db.getRepository(CollectionEntity).save({ ...collection, ...clean(input) });
  }

  /**
   * Remove a collection.
   */
  async remove(id: ID): MutationResult {
    const collection = await this.findUnique({ id });

    if (!collection) {
      return new ErrorResult(
        CollectionErrorCode.COLLECTION_NOT_FOUND,
        `Collection with id ${id} not found`
      );
    }

    return this.db.getRepository(CollectionEntity).remove(collection);
  }

  /**
   * Set products to a collection.
   *
   * @warning This completely overrides the current products of the collection with the new ones.
   */
  async setProducts(collectionId: ID, productIds: ID[]) {
    const collection = await this.findUnique({ id: collectionId });

    if (!collection) {
      return new ErrorResult(
        CollectionErrorCode.COLLECTION_NOT_FOUND,
        `Collection with id ${collectionId} not found`
      );
    }

    const products = await this.db
      .getRepository(ProductEntity)
      .find({ where: { id: In(productIds) } });

    collection.products = products;

    return this.db.getRepository(CollectionEntity).save(collection);
  }
}

type MutationResult = Promise<CollectionEntity | ErrorResult<CollectionErrorCode>>;
type FinUniqueInput = { id?: ID; slug?: string; onlyEnabled?: boolean };

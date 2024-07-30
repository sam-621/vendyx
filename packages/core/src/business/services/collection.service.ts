import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { DataSource, In } from 'typeorm';

import { ErrorResult } from '../utils';

import { CollectionErrorCode, CreateCollectionInput, ListInput } from '@/api/common';
import { CollectionEntity, ID, ProductEntity } from '@/persistance';

@Injectable()
export class CollectionService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Get all collections.
   */
  async find(input?: FindInput) {
    return this.db.getRepository(CollectionEntity).find({
      where: { published: input?.onlyPublished || undefined },
      ...clean(input ?? {}),
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Get a collection by id or slug, if none is provided, throw an error.
   */
  async findUnique({ id, slug, onlyPublished }: FinUniqueInput) {
    if (typeof id === 'string') {
      return this.db
        .getRepository(CollectionEntity)
        .findOne({ where: { id, published: onlyPublished || undefined } });
    }

    if (typeof slug === 'string') {
      return this.db
        .getRepository(CollectionEntity)
        .findOne({ where: { slug, published: onlyPublished || undefined } });
    }

    throw new Error('You must provide either an ID or a SLUG to find a collection');
  }

  /**
   * Get a collection by id or slug. If none is provided, throw a graphql error
   */
  async findByIdOrdSlug({ id, slug, onlyPublished }: FinUniqueInput) {
    if (typeof id === 'string') {
      return this.findUnique({ id, onlyPublished });
    }

    if (typeof slug === 'string') {
      return this.findUnique({ slug, onlyPublished });
    }

    throw new GraphQLError('You must provide either an ID or a SLUG to find a collection');
  }

  async findProducts(id: ID, input?: ListInput & { onlyEnabled?: boolean }) {
    return this.db.getRepository(ProductEntity).find({
      where: { collections: { id }, enabled: input?.onlyEnabled || undefined },
      ...clean(input ?? {})
    });
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
  async remove(id: ID): MutationResult<boolean> {
    const collection = await this.findUnique({ id });

    if (!collection) {
      return new ErrorResult(
        CollectionErrorCode.COLLECTION_NOT_FOUND,
        `Collection with id ${id} not found`
      );
    }

    await this.db.getRepository(CollectionEntity).remove(collection);

    return true;
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

type MutationResult<R = CollectionEntity> = Promise<R | ErrorResult<CollectionErrorCode>>;
type FinUniqueInput = { id?: ID; slug?: string; onlyPublished?: boolean };
type FindInput = ListInput & { onlyPublished?: boolean };

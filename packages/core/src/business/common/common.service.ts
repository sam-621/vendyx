import { clean } from '@ebloc/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { FindInput, FindUniqueInput } from './inputs';

import { EBlocEntity, ID } from '@/persistance';

/**
 * @description
 * Exposes common methods to interact with entities.
 * All services should extend this class.
 *
 * @example
 * ```ts
 * export class ProductService extends CommonService<ProductEntity> {
 *   constructor(@InjectDataSource() private readonly db: DataSource) {
 *     super(db, ProductEntity);
 *   }
 *
 * // ...
 *
 * }
 * ```
 */
export class CommonService<Entity extends EBlocEntity> {
  constructor(
    private readonly _db: DataSource,
    private readonly _entity: EntityTarget<ObjectLiteral>
  ) {}

  /**
   * @description
   * Find entities
   */
  async find(input?: FindInput<Entity>) {
    return this._db.getRepository(this._entity).find({
      where: { ...input },
      ...clean({ skip: input?.skip, take: input?.take }),
      relations: input?.relations,
      order: { createdAt: 'ASC' }
    }) as Promise<Entity[]>;
  }

  /**
   * @description
   * Find a unique entity
   */
  async findUnique(input: FindUniqueInput<Entity>) {
    return this._db.getRepository(this._entity).findOne({
      where: { ...input },
      relations: input?.relations
    }) as Promise<Entity | null>;
  }

  /**
   * @description
   * Count entities
   */
  async count(input?: FindInput<Entity>) {
    return this._db.getRepository(this._entity).count({
      where: { ...input },
      ...clean({ skip: input?.skip, take: input?.take }),
      relations: input?.relations
    });
  }

  /**
   * @description
   * Create an entity
   */
  protected async _create(input: QueryDeepPartialEntity<Entity>) {
    const entity = this._db.getRepository(this._entity).create(input);

    await this._db.getRepository(this._entity).insert(entity);

    return entity as Entity;
  }

  /**
   * @description
   * Update an entity
   */
  protected async _update(id: ID, input: QueryDeepPartialEntity<Entity>) {
    const entity = this._db.getRepository(this._entity).create(input);

    await this._db.getRepository(this._entity).update({ id }, entity);

    return entity as Entity;
  }

  protected async _softRemove(id: ID) {
    return this._db.getRepository(this._entity).softRemove({ id }) as Promise<Entity>;
  }
}

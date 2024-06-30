import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ListInput } from '@/app/api/common';
import { CollectionEntity, ID } from '@/app/persistance';

@Injectable()
export class CollectionService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Get all collections.
   */
  find(input: ListInput & { onlyEnabled?: boolean }) {
    return this.db.getRepository(CollectionEntity).find({
      where: { enabled: input.onlyEnabled || undefined },
      ...clean(input),
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Get a collection by id or slug, if none is provided, throw an error.
   */
  findUnique({ id, slug, onlyEnabled }: { id?: ID; slug?: string; onlyEnabled?: boolean }) {
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
}

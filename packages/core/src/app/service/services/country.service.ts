import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ListInput } from '@/app/api/common';
import { CountryEntity, ID } from '@/app/persistance';

@Injectable()
export class CountryService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Find all countries. By default, it returns all countries.
   */
  find(input: ListInput & { onlyEnabled?: boolean }) {
    return this.db.getRepository(CountryEntity).find({
      ...clean(input),
      where: { enabled: input.onlyEnabled || undefined },
      order: { name: 'DESC' }
    });
  }

  /**
   * Find a country by its id.
   */
  findUnique({ id, onlyEnabled }: { id: ID; onlyEnabled?: boolean }) {
    return this.db.getRepository(CountryEntity).findOne({
      where: { id, enabled: onlyEnabled || undefined }
    });
  }
}

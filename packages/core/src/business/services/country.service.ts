import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOptionsRelations } from 'typeorm';

import { ErrorResult } from '../utils';

import { CountryErrorCode, CreateCountryInput, ListInput, UpdateCountryInput } from '@/api/common';
import { CountryEntity, ID } from '@/persistance';

@Injectable()
export class CountryService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Find all countries. By default, it returns all countries.
   */
  find(input?: FindInput) {
    return this.db.getRepository(CountryEntity).find({
      ...clean(input ?? {}),
      where: { enabled: input?.onlyEnabled || undefined },
      order: { createdAt: 'ASC' }
    });
  }

  /**
   * Find a country by its id or name. If none is provided, throw an error.
   */
  findUnique({ id, name, onlyEnabled, relations }: FindUniqueInput) {
    if (typeof id === 'string') {
      return this.db.getRepository(CountryEntity).findOne({
        where: { id, name, enabled: onlyEnabled || undefined },
        relations: relations ?? []
      });
    }

    if (typeof name === 'string') {
      return this.db.getRepository(CountryEntity).findOne({
        where: { name, enabled: onlyEnabled || undefined },
        relations: relations ?? []
      });
    }

    throw new Error('You must provide either an ID or a NAME to find a country');
  }

  /**
   * Create a new country with states.
   */
  async create(input: CreateCountryInput): MutationResult {
    const countryExists = await this.findUnique({ name: input.name });

    if (countryExists) {
      return new ErrorResult(
        CountryErrorCode.DUPLICATED_COUNTRY_NAME,
        'Country name already exists'
      );
    }

    return this.db.getRepository(CountryEntity).save({
      ...clean(input)
    });
  }

  /**
   * Update a country by its id.
   */
  async update(id: ID, input: UpdateCountryInput): MutationResult {
    const countryToUpdate = await this.findUnique({ id });

    if (!countryToUpdate) {
      return new ErrorResult(CountryErrorCode.COUNTRY_NOT_FOUND, 'Country not found');
    }

    return this.db.getRepository(CountryEntity).save({
      ...countryToUpdate,
      ...clean(input)
    });
  }

  async remove(id: ID): MutationResult {
    const countryToRemove = await this.findUnique({ id });

    if (!countryToRemove) {
      return new ErrorResult(CountryErrorCode.COUNTRY_NOT_FOUND, 'Country not found');
    }

    return this.db.getRepository(CountryEntity).remove(countryToRemove);
  }
}

type MutationResult<R = CountryEntity> = Promise<ErrorResult<CountryErrorCode> | R>;
type FindUniqueInput = {
  id?: ID;
  name?: string;
  onlyEnabled?: boolean;
  relations?: FindOptionsRelations<CountryEntity>;
};
type FindInput = ListInput & { onlyEnabled?: boolean };

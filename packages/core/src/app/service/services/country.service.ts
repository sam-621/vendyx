import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult } from '../utils';

import {
  CountryErrorCode,
  CreateCountryInput,
  ListInput,
  UpdateCountryInput
} from '@/app/api/common';
import { CountryEntity, ID, StateEntity } from '@/app/persistance';

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

  /**
   * Find all states of a country by its id.
   */
  findStates(id: ID, input: ListInput & { onlyEnabled?: boolean }) {
    return this.db.getRepository(StateEntity).find({
      ...clean(input),
      where: { country: { id }, enabled: input.onlyEnabled || undefined },
      order: { name: 'DESC' }
    });
  }

  /**
   * Create a new country with states.
   */
  async create(input: CreateCountryInput): MutationResult {
    const { states } = input;

    return this.db.getRepository(CountryEntity).save({
      ...clean(input),
      states: states?.map(({ name }) => ({ name }))
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

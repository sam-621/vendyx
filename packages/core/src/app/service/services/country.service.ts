import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOptionsRelations } from 'typeorm';

import { ErrorResult } from '../utils';

import {
  CountryErrorCode,
  CreateCountryInput,
  CreateStateInput,
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
  find(input?: FindInput) {
    return this.db.getRepository(CountryEntity).find({
      ...clean(input ?? {}),
      where: { enabled: input?.onlyEnabled || undefined },
      order: { name: 'DESC' }
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
   * Find all states of a country by its id.
   */
  findStates(id: ID, input?: FindInput) {
    return this.db.getRepository(StateEntity).find({
      ...clean(input ?? {}),
      where: { country: { id }, enabled: input?.onlyEnabled || undefined },
      order: { name: 'DESC' }
    });
  }

  /**
   * Create a new country with states.
   */
  async create(input: CreateCountryInput): MutationResult {
    const { states } = input;

    const countryExists = await this.findUnique({ name: input.name });

    if (countryExists) {
      return new ErrorResult(
        CountryErrorCode.DUPLICATED_COUNTRY_NAME,
        'Country name already exists'
      );
    }

    return this.db.getRepository(CountryEntity).save({
      ...clean(input),
      states: states?.length ? states?.map(state => ({ name: state?.name })) : []
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

  /**
   * Set states in a country by its id.
   */
  async addStates(id: ID, input: CreateStateInput[]) {
    const countryToUpdate = await this.findUnique({ id, relations: { states: true } });

    const statesAlreadyExists = countryToUpdate?.states?.map(state => state.name) || [];

    if (input.some(state => statesAlreadyExists.includes(state.name))) {
      return new ErrorResult(
        CountryErrorCode.DUPLICATED_STATE_NAME_IN_COUNTRY,
        'State name already exists in this country'
      );
    }

    if (!countryToUpdate) {
      return new ErrorResult(CountryErrorCode.COUNTRY_NOT_FOUND, 'Country not found');
    }

    return this.db.getRepository(CountryEntity).save({
      ...countryToUpdate,
      states: [...countryToUpdate.states, ...input.map(state => ({ name: state.name }))]
    });
  }

  /**
   * Remove states from a country by its id.
   */
  async removeStates(id: ID, stateIds: ID[]) {
    const countryToUpdate = await this.findUnique({ id, relations: { states: true } });

    if (!countryToUpdate) {
      return new ErrorResult(CountryErrorCode.COUNTRY_NOT_FOUND, 'Country not found');
    }

    await this.db.getRepository(StateEntity).delete(stateIds);

    return this.findUnique({ id });
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

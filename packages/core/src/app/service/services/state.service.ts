import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult } from '../utils';

import { ListInput, StateErrorCode, UpdateStateInput } from '@/app/api/common';
import { CountryEntity, ID, StateEntity } from '@/app/persistance';

@Injectable()
export class StateService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Find all states. By default, it returns all states.
   */
  find(input: ListInput & { onlyEnabled?: boolean }) {
    return this.db.getRepository(StateEntity).find({
      ...clean(input),
      where: { enabled: input.onlyEnabled || undefined },
      order: { name: 'DESC' }
    });
  }

  /**
   * Find an state by its id.
   */
  findUnique({ id, onlyEnabled }: { id: ID; onlyEnabled?: boolean }) {
    return this.db.getRepository(StateEntity).findOne({
      where: { id, enabled: onlyEnabled || undefined }
    });
  }

  async update(id: ID, input: UpdateStateInput) {
    const country = await this.db
      .getRepository(CountryEntity)
      .findOne({ where: { states: { id } } });

    if (!country) {
      return new ErrorResult(StateErrorCode.STATE_NOT_FOUND, 'State not found');
    }

    const states = await this.db.getRepository(StateEntity).find({
      where: { country: { id: country.id } }
    });

    const duplicatedStateName = states.find(s => s.name === input.name && s.id !== id);

    if (duplicatedStateName) {
      return new ErrorResult(
        StateErrorCode.DUPLICATED_STATE_NAME_IN_COUNTRY,
        `State name already exists in ${country.name}`
      );
    }

    return await this.db.getRepository(StateEntity).save({ id, ...clean(input) });
  }
}

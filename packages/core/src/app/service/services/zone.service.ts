import { clean } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ErrorResult } from '../utils';

import { CreateZoneInput, ListInput, UpdateZoneInput, ZoneErrorCode } from '@/app/api/common';
import { ID, ZoneEntity } from '@/app/persistance';

@Injectable()
export class ZoneService {
  constructor(@InjectDataSource() private db: DataSource) {}

  /**
   * Fin unique zone by id.
   */
  findUnique(input: FindUniqueInput) {
    if (input.id) {
      return this.db.getRepository(ZoneEntity).findOne({ where: { id: input.id } });
    }

    if (input.name) {
      return this.db.getRepository(ZoneEntity).findOne({ where: { name: input.name } });
    }

    throw new Error('You must provide either an ID or a NAME to find a zone');
  }

  /**
   * Find all zones.
   */
  find(input?: ListInput) {
    return this.db.getRepository(ZoneEntity).find({
      ...clean(input ?? {})
    });
  }

  /**
   * Create a new zone.
   *
   * 1. Check if a zone with the same name already exists.
   * 2. Save zone
   */
  async create(input: CreateZoneInput) {
    const zoneWithSameName = await this.findUnique({ name: input.name });

    if (zoneWithSameName) {
      return new ErrorResult(ZoneErrorCode.DUPLICATED_ZONE_NAME, 'Zone name already exists');
    }

    return await this.db.getRepository(ZoneEntity).save(input);
  }

  /**
   * Update a zone by the given id.
   *
   * 1. Check if a zone with the same name already exists.
   * 2. Update zone
   */
  async update(id: ID, input: UpdateZoneInput) {
    const zoneWithSameName = await this.findUnique({ name: input.name ?? '' });

    if (zoneWithSameName && zoneWithSameName.id !== id) {
      return new ErrorResult(ZoneErrorCode.DUPLICATED_ZONE_NAME, 'Zone name already exists');
    }

    await this.db.getRepository(ZoneEntity).update({ id }, { name: input.name ?? '' });
  }

  /**
   * Remove a zone by the given id and its shipping methods.
   */
  async removeZone(id: ID) {
    await this.db.getRepository(ZoneEntity).delete({ id });
  }
}

type FindUniqueInput = { id?: ID; name?: string };

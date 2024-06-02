import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { OptionValueService } from './option-value.service';

import { ID, OptionEntity } from '@/app/persistance';

@Injectable()
export class OptionService {
  constructor(
    private optionValueService: OptionValueService,
    @InjectDataSource() private db: DataSource
  ) {}

  async findValues(id: ID) {
    const option = await this.db
      .getRepository(OptionEntity)
      .findOne({ where: { id }, relations: { values: true } });

    return option.values;
  }

  async create(name: string, values: string[]) {
    const optionValues = await this.optionValueService.create(values);

    const optionToSave = this.db.getRepository(OptionEntity).create({
      name,
      values: optionValues
    });

    return await this.db.getRepository(OptionEntity).save(optionToSave);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ID, OptionValueEntity } from '@/app/persistance';

@Injectable()
export class OptionValueService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async findOption(id: ID) {
    const option = await this.db
      .getRepository(OptionValueEntity)
      .findOne({ where: { id: id }, relations: { option: true } });

    return option?.option;
  }

  // TODO: REFACTOR THIS TO A TRANSACTION
  create(values: string[]) {
    return this.db
      .getRepository(OptionValueEntity)
      .save(values.map(value => this.db.getRepository(OptionValueEntity).create({ value })));
  }
}

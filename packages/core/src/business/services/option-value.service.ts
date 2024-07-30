import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ID, OptionValueEntity } from '@/persistance';

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
  async create(values: string[]) {
    const results: OptionValueEntity[] = [];

    for (const value of values) {
      const optionValue = this.db.getRepository(OptionValueEntity).create({ value });
      const savedOptionValue = await this.db.getRepository(OptionValueEntity).save(optionValue);
      results.push(savedOptionValue);
    }

    return results;
  }
}

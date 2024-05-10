import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { OptionValueEntity } from '@/app/persistance';

@Injectable()
export class OptionValueService {
  constructor(@InjectDataSource() private db: DataSource) {}

  // TODO: REFACTOR THIS TO A TRANSACTION
  create(values: string[]) {
    return this.db
      .getRepository(OptionValueEntity)
      .save(
        values.map((value) =>
          this.db.getRepository(OptionValueEntity).create({ value }),
        ),
      );
  }
}

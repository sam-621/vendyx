import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OptionValueEntity } from '@/app/persistance';

@Injectable()
export class OptionValueService {
  constructor(
    @InjectRepository(OptionValueEntity)
    private optionValueRepository: Repository<OptionValueEntity>,
  ) {}

  create(values: string[]) {
    return this.optionValueRepository.save(
      values.map((value) => this.optionValueRepository.create({ value })),
    );
  }
}

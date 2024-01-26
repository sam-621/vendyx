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

  async create(values: string[]) {
    const optionValuesSaved = await this.optionValueRepository.save(
      values.map((val) => this.optionValueRepository.create({ value: val })),
    );

    return optionValuesSaved;
  }
}

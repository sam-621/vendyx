import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OptionValueService } from './option-value.service';

import { OptionEntity } from '@/app/persistance';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
    private optionValueService: OptionValueService,
  ) {}

  async create(name: string, values: string[]) {
    const optionValues = await this.optionValueService.create(values);

    const optionToSave = this.optionRepository.create({
      name,
      values: optionValues,
    });

    return await this.optionRepository.save(optionToSave);
  }
}

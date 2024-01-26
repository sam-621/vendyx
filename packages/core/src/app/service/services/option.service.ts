import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OptionEntity, OptionValueEntity } from '@/app/persistance';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
    @InjectRepository(OptionValueEntity)
    private optionValueRepository: Repository<OptionValueEntity>,
  ) {}

  async create(name: string) {
    const optionToSave = this.optionRepository.create({ name });

    await this.optionRepository.insert(optionToSave);

    return optionToSave;
  }
}

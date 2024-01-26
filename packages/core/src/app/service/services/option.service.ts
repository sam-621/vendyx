import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OptionEntity } from '@/app/persistance';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
  ) {}

  async create(name: string) {
    const optionToSave = this.optionRepository.create({ name });
    await this.optionRepository.insert(optionToSave);

    return optionToSave;
  }
}

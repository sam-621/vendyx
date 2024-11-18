import { Injectable } from '@nestjs/common';

import { CountryRepository } from '@/persistence/repositories';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async find() {
    return this.countryRepository.find();
  }

  async findInStore() {
    return this.countryRepository.findInStore();
  }
}

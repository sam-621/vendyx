import { Injectable } from '@nestjs/common';

import { CountryRepository } from '@/persistance/repositories';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async find() {
    return this.countryRepository.find();
  }
}

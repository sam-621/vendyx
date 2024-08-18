import { CountryRepository } from '@/persistance/repositories';

export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  find() {
    return this.countryRepository.find();
  }
}

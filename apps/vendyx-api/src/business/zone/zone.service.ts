import { Injectable } from '@nestjs/common';

import { CreateZoneInput } from '@/api/shared';
import { ZoneRepository } from '@/persistance/repositories';

@Injectable()
export class ZoneService {
  constructor(private readonly zoneRepository: ZoneRepository) {}

  find() {
    return this.zoneRepository.find();
  }

  findById(id: string) {
    return this.zoneRepository.findById(id);
  }

  create(input: CreateZoneInput) {
    return this.zoneRepository.insert({
      name: input.name,
      states: { create: input.stateIds.map(id => ({ stateId: id })) }
    });
  }

  update(id: string, input: CreateZoneInput) {
    return this.zoneRepository.update(id, {
      name: input.name,
      states: input.stateIds
        ? {
            connectOrCreate: input.stateIds.map(stateId => ({
              where: { zoneId_stateId: { zoneId: id, stateId } },
              create: { stateId }
            }))
          }
        : undefined
    });
  }

  async remove(id: string) {
    await this.zoneRepository.removeAllStates(id);
    return this.zoneRepository.remove(id);
  }
}

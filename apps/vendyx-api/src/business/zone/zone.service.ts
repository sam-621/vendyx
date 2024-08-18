import { Injectable } from '@nestjs/common';

import { CreateZoneInput, UpdateZoneInput } from '@/api/shared';
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

  async update(id: string, input: UpdateZoneInput) {
    const states = await this.zoneRepository.findStates(id);

    const statesToRemove = states.filter(state => !input.stateIds?.includes(state.stateId));

    await this.zoneRepository.removeStates(
      id,
      statesToRemove.map(state => state.stateId)
    );

    return await this.zoneRepository.update(id, {
      name: input.name ?? undefined,
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
    await this.zoneRepository.removeAllShippingMethods(id);
    await this.zoneRepository.remove(id);

    return true;
  }
}

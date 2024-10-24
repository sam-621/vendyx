import { Injectable } from '@nestjs/common';

import { CreateShippingMethodInput, UpdateShippingMethodInput } from '@/api/shared';
import { ShippingMethodRepository } from '@/persistance/repositories';

import { clean } from '../shared';

@Injectable()
export class ShippingMethodService {
  constructor(private readonly shippingMethodRepository: ShippingMethodRepository) {}

  find(options?: FindOptions) {
    return this.shippingMethodRepository.find({ onlyEnabled: options?.onlyEnabled });
  }

  findHandlers() {
    return this.shippingMethodRepository.findHandlers();
  }

  create(input: CreateShippingMethodInput) {
    return this.shippingMethodRepository.insert({
      name: input.name,
      description: input.description,
      enabled: input.enabled ?? false,
      handlerMetadata: input.handlerMetadata,
      shippingHandler: {
        connect: {
          id: input.handlerId
        }
      },
      zone: {
        connect: {
          id: input.zoneId
        }
      }
    });
  }

  async update(id: string, input: UpdateShippingMethodInput) {
    return await this.shippingMethodRepository.update(id, clean(input));
  }

  async remove(id: string) {
    await this.shippingMethodRepository.remove(id);
    return true;
  }
}

type FindOptions = { onlyEnabled?: boolean };

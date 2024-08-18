import { CreateShippingMethodInput, UpdateShippingMethodInput } from '@/api/shared';
import { ShippingMethodRepository } from '@/persistance/repositories';

import { clean } from '../shared';

export class ShippingMethod {
  constructor(private readonly shippingMethodRepository: ShippingMethodRepository) {}

  find() {
    return this.shippingMethodRepository.find();
  }

  create(input: CreateShippingMethodInput) {
    return this.shippingMethodRepository.insert({
      name: input.name,
      description: input.description,
      enabled: input.enabled,
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
    await this.shippingMethodRepository.update(id, clean(input));
  }

  async remove(id: string) {
    await this.shippingMethodRepository.remove(id);
  }
}

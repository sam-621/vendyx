import { Injectable } from '@nestjs/common';

import { CreateOptionInput, UpdateOptionInput } from '@/api/shared';
import { OptionRepository } from '@/persistance/repositories';

@Injectable()
export class OptionService {
  constructor(private readonly repository: OptionRepository) {}

  // TODO: Add validation for duplicated names and duplicated values
  async create(productId: string, input: CreateOptionInput) {
    return this.repository.insert({
      name: input.name,
      values: { createMany: { data: input.values.map(v => ({ name: v })) } },
      products: { create: { productId } }
    });
  }

  // TODO: Add validation for duplicated names and duplicated values
  async update(id: string, input: UpdateOptionInput) {
    const valuesToCreate = input.values?.filter(v => v.id === undefined);
    const valuesToUpdate = input.values?.filter(v => v.id !== undefined);

    return await this.repository.update(id, {
      name: input.name ?? '',
      values: {
        update: valuesToUpdate?.map(v => ({
          where: { id: v.id ?? '' },
          data: { name: v.name ?? '' }
        })),
        create: valuesToCreate?.map(v => ({ name: v.name ?? '' }))
      }
    });
  }

  async softRemove(id: string) {
    return this.repository.softRemove(id);
  }

  async softRemoveValues(ids: string[]) {
    await this.repository.softRemoveValues(ids);

    return true;
  }
}

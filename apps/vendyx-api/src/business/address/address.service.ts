import { Inject, Injectable } from '@nestjs/common';

import { CreateAddressInput, UpdateAddressInput } from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

import { clean } from '../shared/utils/clean.utils';

@Injectable()
export class AddressService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async create(customerId: ID, input: CreateAddressInput) {
    const hasDefaultAddress = await this.prisma.address.findFirst({
      where: { customerId: customerId, isDefault: true }
    });

    // If the address to add is default, we need to remove the default flag from the current default address
    if (input.isDefault && hasDefaultAddress) {
      await this.prisma.address.update({
        where: { id: hasDefaultAddress.id },
        data: { isDefault: false }
      });

      return await this.prisma.address.create({
        data: {
          ...clean(input),
          customerId
        }
      });
    }

    // If the address to add is the first address, we set it as default
    return await this.prisma.address.create({
      data: {
        ...clean(input),
        isDefault: !hasDefaultAddress,
        customerId
      }
    });
  }

  async update(customerId: ID, addressId: ID, input: UpdateAddressInput) {
    if (input.isDefault) {
      const hasDefaultAddress = await this.prisma.address.findFirst({
        where: { customerId: customerId, isDefault: true }
      });

      if (hasDefaultAddress) {
        await this.prisma.address.update({
          where: { id: hasDefaultAddress.id },
          data: { isDefault: false }
        });
      }

      return await this.prisma.address.update({
        where: { id: addressId },
        data: clean(input)
      });
    }

    return await this.prisma.address.update({
      where: { id: addressId },
      data: clean(input)
    });
  }

  // TODO: do not let remove if is the default address
  async remove(id: ID) {
    return await this.prisma.address.delete({ where: { id } });
  }
}

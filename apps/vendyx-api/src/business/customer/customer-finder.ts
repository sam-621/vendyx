import { CustomerListInput, DEFAULT_STRING_FILTER } from '@/api/shared';
import { PrismaForShop } from '@/persistance/prisma-clients';

import { clean } from '../shared';

export class CustomerFinder {
  constructor(private readonly _prisma: PrismaForShop) {}

  async find(input?: CustomerListInput) {
    return this._prisma.customer.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        enabled: input?.filters?.enabled ? clean(input?.filters?.enabled) : { equals: true },
        OR: [
          {
            firstName: {
              ...clean(input?.filters?.firstName ?? DEFAULT_STRING_FILTER),
              mode: 'insensitive'
            }
          },
          {
            lastName: {
              ...clean(input?.filters?.lastName ?? DEFAULT_STRING_FILTER),
              mode: 'insensitive'
            }
          },
          {
            email: {
              ...clean(input?.filters?.email ?? DEFAULT_STRING_FILTER),
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async count(input?: CustomerListInput) {
    return this._prisma.customer.count({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        enabled: input?.filters?.enabled ? clean(input?.filters?.enabled) : { equals: true },
        OR: [
          {
            firstName: {
              ...clean(input?.filters?.firstName ?? DEFAULT_STRING_FILTER),
              mode: 'insensitive'
            }
          },
          {
            lastName: {
              ...clean(input?.filters?.lastName ?? DEFAULT_STRING_FILTER),
              mode: 'insensitive'
            }
          },
          {
            email: {
              ...clean(input?.filters?.email ?? DEFAULT_STRING_FILTER),
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}

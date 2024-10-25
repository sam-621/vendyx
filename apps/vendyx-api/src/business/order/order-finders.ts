import { OrderState } from '@prisma/client';

import { parseOrderCode } from './order.utils';
import { clean } from '../shared';

import { OrderListInput } from '@/api/shared';
import { PrismaForShop } from '@/persistance/prisma-clients';

/**
 * Helper class to store methods related to find many orders managing the filters
 */
export class OrderFinders {
  constructor(private readonly _prisma: PrismaForShop) {}

  async find(input?: OrderListInput) {
    return this._prisma.order.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        state: input?.filters?.state ? input?.filters?.state : { not: OrderState.MODIFYING },
        ...(input?.filters?.customer
          ? {
              OR: [
                {
                  code: input?.filters?.code ? parseOrderCode(input?.filters?.code) : undefined
                },
                {
                  customer: {
                    OR: [
                      {
                        firstName: { ...clean(input?.filters?.customer ?? {}), mode: 'insensitive' }
                      },
                      {
                        lastName: { ...clean(input?.filters?.customer ?? {}), mode: 'insensitive' }
                      }
                    ]
                  }
                }
              ]
            }
          : {
              code: input?.filters?.code ? parseOrderCode(input?.filters?.code) : undefined
            })
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async count(input?: OrderListInput) {
    return this._prisma.order.count({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        ...(input?.filters?.customer
          ? {
              OR: [
                {
                  code: input?.filters?.code ? parseOrderCode(input?.filters?.code) : undefined
                },
                {
                  customer: {
                    OR: [
                      {
                        firstName: { ...clean(input?.filters?.customer ?? {}), mode: 'insensitive' }
                      },
                      {
                        lastName: { ...clean(input?.filters?.customer ?? {}), mode: 'insensitive' }
                      }
                    ]
                  }
                }
              ]
            }
          : {
              code: input?.filters?.code ? parseOrderCode(input?.filters?.code) : undefined,
              state: input?.filters?.state ? input?.filters?.state : { not: OrderState.MODIFYING }
            })
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}

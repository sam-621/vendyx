import { Inject, Injectable } from '@nestjs/common';
import { differenceInDays, format, startOfMonth, startOfWeek } from 'date-fns';

import { MetricInput } from '@/api/shared';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@Injectable()
export class MetricsService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async getTotalSales(input: MetricInput) {
    const aggregate = await this.prisma.order.aggregate({
      where: {
        createdAt: {
          gte: new Date(input.startsAt),
          lte: new Date(input.endsAt)
        }
      },
      _sum: {
        total: true
      }
    });

    return aggregate._sum.total;
  }

  async getTotalSalesMetrics(input: MetricInput) {
    const startsAt = new Date(input.startsAt);
    const endsAt = new Date(input.endsAt);

    const result = await this.prisma.order.groupBy({
      by: ['createdAt', 'total'],
      having: {
        createdAt: {
          gte: startsAt,
          lte: endsAt
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const interval = this.getInterval(startsAt, endsAt);
    const groupedData = this.groupByInterval(result, interval);

    return Object.entries(groupedData).map(([key, value]) => ({
      key,
      value
    }));
  }

  private groupByInterval(data: { createdAt: Date; total: number }[], interval: MetricsInterval) {
    return data.reduce((acc, { total, createdAt }) => {
      let key = '';

      if (interval === 'day') {
        key = format(createdAt, 'yyyy-MM-dd');
      } else if (interval === 'week') {
        key = format(startOfWeek(createdAt), 'yyyy-MM-dd');
      } else if (interval === 'month') {
        key = format(startOfMonth(createdAt), 'yyyy-MM');
      }

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += total;

      return acc;
    }, {});
  }

  private getInterval(startsAt: Date, endsAt: Date): MetricsInterval {
    const daysDifference = differenceInDays(endsAt, startsAt);

    if (daysDifference <= 30) {
      return 'day';
    } else if (daysDifference <= 180) {
      return 'week';
    } else {
      return 'month';
    }
  }
}

type MetricsInterval = 'day' | 'week' | 'month';

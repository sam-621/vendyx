import { Args, Query, Resolver } from '@nestjs/graphql';

import { MetricsInput } from '@/api/shared/types/gql.types';
import { MetricsService } from '@/business/metrics/metrics.service';

@Resolver('Metric')
export class MetricsResolver {
  constructor(private readonly metricsService: MetricsService) {}

  @Query('totalSales')
  async totalSales(@Args('input') input: MetricsInput) {
    const [total, metrics] = await Promise.all([
      this.metricsService.getTotalSales(input),
      this.metricsService.getTotalSalesMetrics(input)
    ]);

    return {
      metrics,
      total
    };
  }

  @Query('totalOrders')
  async totalOrders(@Args('input') input: MetricsInput) {
    const [total, metrics] = await Promise.all([
      this.metricsService.getTotalOrders(input),
      this.metricsService.getTotalOrdersMetrics(input)
    ]);

    return {
      metrics,
      total
    };
  }
}

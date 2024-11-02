import { Args, Query, Resolver } from '@nestjs/graphql';

import { MetricsInput } from '@/api/shared';
import { MetricsService } from '@/business/metrics';

@Resolver('Metric')
export class MetricsResolver {
  constructor(private readonly metricsService: MetricsService) {}

  @Query('totalSales')
  async totalSales(@Args('input') input: MetricsInput) {
    const [totalSales, metrics] = await Promise.all([
      this.metricsService.getTotalSales(input),
      this.metricsService.getTotalSalesMetrics(input)
    ]);

    return {
      metrics,
      totalSales
    };
  }
}

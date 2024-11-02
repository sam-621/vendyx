import { getFragmentData } from '../codegen';
import { COMMON_TOTAL_SALES_METRICS_FRAGMENT, GET_TOTAL_SALES_QUERY } from '../operations';
import { type MetricRange } from '../scalars';
import { serviceGqlFetcher } from './service-fetchers';

export const MetricsService = {
  Tags: {
    totalSales: (startsAt: Date, endsAt: Date) =>
      `totalSales-${startsAt.toString()}-${endsAt.toString()}`
  },

  async getTotalSales(input: MetricRange) {
    const result = await serviceGqlFetcher(
      GET_TOTAL_SALES_QUERY,
      { input },
      { tags: [MetricsService.Tags.totalSales(input.startsAt, input.endsAt)] }
    );

    const totalSales = getFragmentData(COMMON_TOTAL_SALES_METRICS_FRAGMENT, result.totalSales);

    return totalSales;
  }
};

import { getFragmentData } from '../codegen';
import {
  COMMON_METRICS_RESULT_FRAGMENT,
  GET_TOTAL_ORDERS_QUERY,
  GET_TOTAL_SALES_QUERY
} from '../operations';
import { type MetricRange } from '../scalars';
import { serviceGqlFetcher } from './service-fetchers';

export const MetricsService = {
  Tags: {
    totalSales: (startsAt: Date, endsAt: Date) =>
      `totalSales-${startsAt.toString()}-${endsAt.toString()}`,
    totalOrders: (startsAt: Date, endsAt: Date) =>
      `totalOrders-${startsAt.toString()}-${endsAt.toString()}`
  },

  async getTotalSales(input: MetricRange) {
    const result = await serviceGqlFetcher(
      GET_TOTAL_SALES_QUERY,
      { input },
      { tags: [MetricsService.Tags.totalSales(input.startsAt, input.endsAt)] }
    );

    const totalSales = getFragmentData(COMMON_METRICS_RESULT_FRAGMENT, result.totalSales);

    return totalSales;
  },

  async getTotalOrders(input: MetricRange) {
    const result = await serviceGqlFetcher(
      GET_TOTAL_ORDERS_QUERY,
      { input },
      { tags: [MetricsService.Tags.totalOrders(input.startsAt, input.endsAt)] }
    );

    const totalOrders = getFragmentData(COMMON_METRICS_RESULT_FRAGMENT, result.totalOrders);

    return totalOrders;
  }
};

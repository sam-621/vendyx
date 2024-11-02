import { graphql } from '../codegen';

export const COMMON_METRICS_RESULT_FRAGMENT = graphql(`
  fragment CommonMetricsResult on MetricsResult {
    metrics {
      key
      value
    }
    total
  }
`);

export const GET_TOTAL_SALES_QUERY = graphql(`
  query GetTotalSales($input: MetricsInput!) {
    totalSales(input: $input) {
      ...CommonMetricsResult
    }
  }
`);

export const GET_TOTAL_ORDERS_QUERY = graphql(`
  query GetTotalOrders($input: MetricsInput!) {
    totalOrders(input: $input) {
      ...CommonMetricsResult
    }
  }
`);

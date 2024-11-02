import { graphql } from '../codegen';

export const COMMON_TOTAL_SALES_METRICS_FRAGMENT = graphql(`
  fragment CommonTotalSalesMetrics on MetricsResult {
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
      ...CommonTotalSalesMetrics
    }
  }
`);
